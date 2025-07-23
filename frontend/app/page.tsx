"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { SearchForm } from "../components/SearchForm";
import { ResultsList } from "../components/ResultsList";
import type { Match, SearchResponse } from "../components/types";

export default function HomePage() {
  const [results, setResults] = useState<Match[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (url: string, query: string) => {
    setError("");
    // Optional: clear prior results
    setResults([]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/search`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, query }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({} as any));
        throw new Error(body.detail || res.statusText);
      }
      const data: SearchResponse = await res.json();
      setResults(data.matches);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    }
  };

  return (
    <main className="flex flex-col items-center py-16 px-4">
      <Header />
      <SearchForm onSearch={handleSearch} />
      {error && <div className="mt-4 text-red-600">{error}</div>}
      <ResultsList results={results} />
    </main>
  );
}
