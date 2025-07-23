from urllib.parse import urlparse
from openai import OpenAI
from app.config import pinecone_index, OPENAI_KEY
from app.schemas.search import Match
from app.utils.parsing import fetch_html, extract_blocks

oa = OpenAI(api_key=OPENAI_KEY)

def embed_batch(texts: list[str]) -> list[list[float]]:
    """
    Batch‐embed all inputs in one call.
    """
    resp = oa.embeddings.create(model="text-embedding-ada-002", input=texts)
    return [d.embedding for d in resp.data]  # type: ignore

def vector_search(url: str, query: str) -> list[Match]:
    # 1) Fetch raw HTML
    raw = fetch_html(url)

    # 2) Extract block-level (text, html) pairs
    blocks = extract_blocks(raw)
    if not blocks:
        return []

    # 3) Batch‐embed all block texts + the query in one go
    texts = [txt for txt, _ in blocks] + [query]
    embs  = embed_batch(texts)
    chunk_embs = embs[:-1]
    q_emb       = embs[-1]

    # 4) Upsert each block once (namespace = the page’s host)
    namespace = urlparse(url).netloc
    vectors = [
        (str(i), chunk_embs[i], {"text": blocks[i][0], "html": blocks[i][1]})
        for i in range(len(blocks))
    ]
    pinecone_index.upsert(vectors=vectors, namespace=namespace)

    # 5) Query Pinecone for top-10
    resp = pinecone_index.query(
        vector=q_emb,
        top_k=10,
        include_metadata=True,
        namespace=namespace
    )

    # 6) Build Matches, dedupe by text, preserve order
    seen = set()
    results: list[Match] = []
    for m in resp.matches:
        md   = m.metadata or {}
        txt  = md.get("text","")
        html = md.get("html","")
        if not txt or txt in seen:
            continue
        seen.add(txt)
        results.append(
            Match(
                text  = txt,
                html  = html,
                score = int(round(m.score * 100)),
                path  = md.get("path", "/")
            )
        )
        if len(results) == 10:
            break

    return results

