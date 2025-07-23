import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

load_dotenv()

OPENAI_KEY       = os.getenv("OPENAI_API_KEY")
PINECONE_KEY     = os.getenv("PINECONE_API_KEY")
PINECONE_ENV     = os.getenv("PINECONE_ENVIRONMENT")
INDEX_NAME       = os.getenv("PINECONE_INDEX_NAME", "html-search")

pinecone_client = Pinecone(
    api_key=PINECONE_KEY,
    environment=PINECONE_ENV
)

if not pinecone_client.has_index(INDEX_NAME):
    pinecone_client.create_index(
        name=INDEX_NAME,
        dimension=1536,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

pinecone_index = pinecone_client.Index(INDEX_NAME)
