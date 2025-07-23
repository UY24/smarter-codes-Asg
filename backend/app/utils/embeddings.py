from openai import OpenAI

from app.config import OPENAI_KEY

oa = OpenAI(api_key=OPENAI_KEY)

def embed_text(text: str) -> list[float]:
    resp = oa.embeddings.create(model="text-embedding-ada-002", input=text)
    return resp.data[0].embedding 
