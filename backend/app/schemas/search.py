from pydantic import BaseModel
from typing import List

class SearchRequest(BaseModel):
    url: str
    query: str

class Match(BaseModel):
    text: str
    html: str
    score: int      
    path: str      

class SearchResponse(BaseModel):
    matches: List[Match]
