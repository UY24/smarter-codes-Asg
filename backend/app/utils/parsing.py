# app/utils/parsing.py

import re
import requests
from bs4 import BeautifulSoup
from fastapi import HTTPException
from typing import List, Tuple

def fetch_html(url: str) -> str:
    try:
        r = requests.get(url, timeout=10)
        r.raise_for_status()
        return r.text
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching URL: {e}")

def normalize_whitespace(s: str) -> str:
    # collapse any whitespace run into a single space
    return re.sub(r"\s+", " ", s).strip()

def extract_blocks(html: str) -> List[Tuple[str, str]]:
    """
    Strip scripts/styles, then for each block-level element under <body>
    return a (clean_text, clean_html) tuple.
    """
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style"]):
        tag.decompose()

    body = soup.body or soup
    pairs: List[Tuple[str, str]] = []

    # target headings, paragraphs, divs, sections, list items, blockquotes...
    for el in body.find_all(
        ["h1","h2","h3","h4","h5","h6","p","div","section","article","li","blockquote"]
    ):
        txt = normalize_whitespace(el.get_text(separator=" "))
        # skip very short fragments
        if len(txt) < 20:
            continue
        html = normalize_whitespace(str(el))
        pairs.append((txt, html))

    return pairs
