from fastapi import APIRouter
from app.schemas.search import SearchRequest, SearchResponse
from app.services.vector_search import vector_search

router = APIRouter()

@router.post("/search", response_model=SearchResponse)
async def search(req: SearchRequest):
    matches = vector_search(req.url, req.query)
    return SearchResponse(matches=matches)
