"use client";

import React, { useState } from "react";
import type { Match } from "./types";

interface Props {
  match: Match;
  rank: number;
}

export const ResultCard: React.FC<Props> = ({ match, rank }) => {
  const { text, html, score, path } = match;
  const [expanded, setExpanded] = useState(false);
  const [showHtml, setShowHtml] = useState(false);

  const preview =
    text.length > 200 && !expanded
      ? text.slice(0, 200) + "…"
      : text;

  return (
    <article className="bg-white p-6 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Result #{rank}</h2>
        <span className="px-2 py-0.5 text-sm font-medium bg-green-100 text-green-800 rounded">
          {score}% match
        </span>
      </div>

      <div className="text-gray-500 text-sm mb-2">Path: {path}</div>

      <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
        {preview}
      </p>

      {text.length > 200 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-blue-600 text-sm hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
      <br/>
      <button
        onClick={() => setShowHtml(!showHtml)}
        className="mt-2 ml-0 text-blue-600 text-sm hover:underline"
      >
        {showHtml ? "Hide HTML" : "View HTML"}
      </button>

      {showHtml && (
        <pre className="mt-3 p-4 bg-gray-100 text-black text-xs rounded-lg overflow-x-auto">
          {html}
        </pre>
      )}
    </article>
  );
};
