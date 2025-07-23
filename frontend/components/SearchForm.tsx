"use client";

import { FaGlobe, FaSearch } from "react-icons/fa";
import React, { FormEvent, useState } from "react";

interface Props {
  onSearch: (url: string, query: string) => void;
}

export const SearchForm: React.FC<Props> = ({ onSearch }) => {
   const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onSearch(url, query);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-4">
      <div className="relative">
        <FaGlobe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          required
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg
                     bg-white placeholder-gray-400 text-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
      </div>

      {/* Query Input + Button */}
      <div className="relative flex items-center">
        <FaSearch className="w-5 h-5 text-gray-400 absolute left-3" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your search query"
          required
          className="flex-grow pl-10 pr-28 py-3 border border-gray-200 bg-white
                  placeholder-gray-400 text-gray-700 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-0 top-0 h-full bg-blue-600 text-white px-6
                    rounded-r-lg hover:bg-blue-700 disabled:opacity-50 transition cursor-pointer"
        >
          {loading ? "Searching…" : "Search"}
        </button>
      </div>
    </form>
  );
};
