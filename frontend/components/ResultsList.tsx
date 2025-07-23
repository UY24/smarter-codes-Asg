import React from "react";
import { ResultCard } from "./ResultCard";
import type { Match } from "./types";

interface Props {
  results: Match[];
}

export const ResultsList: React.FC<Props> = ({ results }) => {
  if (results.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        No results yet. Enter a URL & query above.
      </p>
    );
  }

  return (
    <section className="space-y-8 py-8">
      {results.map((m, idx) => (
        <ResultCard key={idx} match={m} rank={idx + 1} />
      ))}
    </section>
  );
};
