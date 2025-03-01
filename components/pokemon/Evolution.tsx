"use client";

import { Pokemon } from "@/types";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Paragraph from "@/components/typography/Paragraph";
import { getPokemonData, getPokemonEvolution } from "@/app/lib/pokemon";

interface Props {
  speciesUrl: string;
}

export default function PokemonEvolution({ speciesUrl }: Props) {
  const [evolutionChain, setEvolutionChain] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchEvolutionChain() {
      try {
        const response = await getPokemonEvolution(
          speciesUrl.split("/").slice(-2, -1)[0],
        );

        const evolutionData: Pokemon[] = [];
        let currentStage = response.chain;

        while (currentStage) {
          const pokemonResponse = await getPokemonData(
            currentStage.species.url.split("/").slice(-2, -1)[0],
          );

          evolutionData.push({
            id: pokemonResponse.id,
            name: currentStage.species.name,
            image:
              pokemonResponse.sprites.other["official-artwork"].front_default,
            url: currentStage.species.url,
          });

          currentStage = currentStage.evolves_to[0];
        }

        setEvolutionChain(evolutionData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
        setIsLoading(false);
      }
    }

    fetchEvolutionChain();
  }, [speciesUrl]);

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="text-center">
            <div className="mx-auto mb-2 h-24 w-24 animate-pulse rounded-lg bg-gray-200" />
            <div className="mx-auto h-5 w-24 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 h-24 w-24 animate-pulse rounded-lg bg-gray-200" />
            <div className="mx-auto h-5 w-24 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 h-24 w-24 animate-pulse rounded-lg bg-gray-200" />
            <div className="mx-auto h-5 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      )}

      {!isLoading && evolutionChain.length === 0 && (
        <Paragraph>No evolution chain found</Paragraph>
      )}

      <div className="flex flex-wrap items-center gap-4">
        {evolutionChain.map((pokemon, index) => (
          <Fragment key={pokemon.id}>
            <Link href={`/pokemon/${pokemon.id}`} className="group text-center">
              <div className="relative mx-auto mb-2 h-24 w-24 transition-transform group-hover:scale-110">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Paragraph className="capitalize">{pokemon.name}</Paragraph>
            </Link>
            {index < evolutionChain.length - 1 && (
              <ChevronRight className="h-6 w-6 text-gray-400" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
