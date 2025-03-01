"use client";

import { getPokemonLocationAreas } from "@/app/lib/pokemon";
import Paragraph from "@/components/typography/Paragraph";
import { PokemonLocationAreasResponse } from "@/types";
import { useState, useEffect } from "react";

interface PokemonLocationAreasProps {
  pokemonId: string;
}

export default function PokemonLocationAreas({
  pokemonId,
}: PokemonLocationAreasProps) {
  const [locationAreas, setLocationAreas] =
    useState<PokemonLocationAreasResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchLocationAreas = async () => {
      const locationAreas = await getPokemonLocationAreas(pokemonId);
      setLocationAreas(locationAreas);
      setIsLoading(false);
    };

    fetchLocationAreas();
  }, [pokemonId]);

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center gap-2 max-w-lg">
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      ) : locationAreas.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {locationAreas
            .slice(0, showAll ? locationAreas.length : 10)
            .map(locationArea => (
              <div
                className="rounded-lg bg-gray-100 px-2 py-1 text-sm capitalize"
                key={locationArea.location_area.url}
              >
                <Paragraph>
                  {locationArea.location_area.name.replaceAll("-", " ")}
                </Paragraph>
              </div>
            ))}
          {locationAreas.length > 10 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="cursor-pointer rounded-lg bg-gray-100 px-2 py-1 text-center text-sm font-semibold transition-colors hover:bg-gray-200"
            >
              {showAll ? "Show less" : `+${locationAreas.length - 10} more`}
            </button>
          )}
        </div>
      ) : (
        <Paragraph>No location areas found</Paragraph>
      )}
    </div>
  );
}
