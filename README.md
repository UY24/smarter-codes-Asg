# HTML‐Chunk Search SPA

A Next.js + TypeScript single-page application paired with a FastAPI backend.  
Users enter a website URL and a natural-language query; the app returns the top 10 matching DOM blocks (e.g. `<div>`, `<p>`, `<h1>`) from that page.

---

## 📁 Repository Structure

```

/
├── app/                   # FastAPI backend
│   ├── api/
│   │   └── search.py      # /search endpoint
│   ├── services/
│   │   └── vector_search.py
│   ├── utils/
│   │   └── parsing.py
│   │   └── embeddings.py
│   │   └── tokenizer.py
│   ├── schemas/
│   │   └── search.py
│   ├── config.py          # Pinecone & OpenAI init
│   └── main.py            # FastAPI app setup
├── frontend/              # Next.js + TypeScript
│   ├── components/
│   │   ├── SearchForm.tsx
│   │   ├── ResultsList.tsx
│   │   └── ResultCard.tsx
│   ├── types.ts           # Shared TS interfaces
│   └── app/page.tsx       # Main page (App Router)
├── .env.example           # Environment variable template
└── README.md              # This file

````

---

## ⚙️ Prerequisites

- **Node.js** ≥ 14 & **npm** or **yarn**  
- **Python** ≥ 3.9  
- An OpenAI API key  
- A Pinecone account (free tier works)

---

## 🔧 Configuration

1. **Clone** the repo and `cd` into it.  
2. Copy & edit environment variables:

   ```bash
   cp .env.example .env
````

3. In `.env`, set:

   ```
   # Backend
   OPENAI_API_KEY=sk-…
   PINECONE_API_KEY=…
   PINECONE_ENVIRONMENT=<your-pinecone-env>
   PINECONE_INDEX_NAME=html-search

   # Frontend
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

---

## 🚀 Running the Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

* **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🚀 Running the Frontend

```bash
cd frontend
npm install          # or yarn
npm run dev          # or yarn dev
```

* **Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Usage

1. Enter a **public** URL (no JS-only sites).
2. Enter your **search query** in plain English.
3. Click **Search**.
4. View up to 10 result cards:

   * **Rank** & **% match** badge
   * **Snippet** (truncated to 200 chars, “Read more”)
   * **View HTML** toggle (shows the exact container’s HTML)

---

## 🏗️ Architecture Highlights

* **Batch embeddings**: we send *all* blocks + query in one OpenAI call for speed.
* **Block extraction**: we parse and clean the page, then extract each `<h1>`, `<p>`, `<div>`, etc., as its own chunk.
* **Pinecone**: stores and retrieves vector embeddings, returns top-k semantically closest chunks.


Enjoy! 🎉
