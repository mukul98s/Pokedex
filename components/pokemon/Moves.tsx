"use client";

import { PokemonMove } from "@/types";
import { useState } from "react";
import Paragraph from "@/components/typography/Paragraph";

interface PokemonMovesProps {
  moves: PokemonMove[];
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
  const [showAllMoves, setShowAllMoves] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      {moves.slice(0, showAllMoves ? moves.length : 20).map(move => (
        <div
          key={move.move.name}
          className="rounded-lg bg-gray-100 px-2 py-1 text-sm capitalize"
        >
          <Paragraph>{move.move.name.replace("-", " ")}</Paragraph>
        </div>
      ))}
      {moves.length > 20 && (
        <button
          onClick={() => setShowAllMoves(!showAllMoves)}
          className="cursor-pointer rounded-lg bg-gray-100 px-2 py-1 text-center text-sm font-semibold transition-colors hover:bg-gray-200"
        >
          {showAllMoves ? "Show less" : `+${moves.length - 20} more`}
        </button>
      )}
    </div>
  );
}
