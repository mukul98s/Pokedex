import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPokemonData, getPokemonSpecies } from "@/app/lib/pokemon";
import PokemonAbilities from "@/components/pokemon/Abilities";
import PokemonEvolution from "@/components/pokemon/Evolution";
import PokemonMoves from "@/components/pokemon/Moves";
import PokemonStats from "@/components/pokemon/Stats";
import Heading1 from "@/components/typography/Heading1";
import Heading2 from "@/components/typography/Heading2";
import { typeColors } from "@/styles/pokemonTypeColors";
import Paragraph from "@/components/typography/Paragraph";
import clsx from "clsx";
import PokemonLocationAreas from "@/components/pokemon/LocationAreas";
import { PageProps } from "@/.next/types/app/pokemon/[id]/page";

export default async function PokemonDetails({ params }: PageProps) {
  const { id: pokemonId } = await params;

  const [pokemon, species] = await Promise.all([
    getPokemonData(pokemonId),
    getPokemonSpecies(pokemonId),
  ]);

  if (!pokemon || !species) {
    return notFound();
  }

  return (
    <div className="px-4 py-8">
      {/* Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-blue-500 hover:underline"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Pokédex
        </Link>
        <div className="flex items-center space-x-4">
          {Number.parseInt(pokemonId) > 1 && (
            <Link
              href={`/pokemon/${Number.parseInt(pokemonId) - 1}`}
              className="flex items-center text-blue-500 hover:underline"
              prefetch
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Link>
          )}
          <Link
            href={`/pokemon/${Number.parseInt(pokemonId) + 1}`}
            className="flex items-center text-blue-500 hover:underline"
            prefetch
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Pokemon details */}
      <div className="rounded-lg bg-white shadow">
        <div className="p-6 sm:p-10">
          {/* Pokemon image and name */}
          <div className="mb-6 flex flex-col items-center sm:flex-row">
            <div className="relative mb-4 h-48 w-48 sm:mr-8 sm:mb-0">
              <Image
                src={
                  pokemon.sprites.other["official-artwork"].front_default ||
                  pokemon.sprites.other["official-artwork"].front_shiny
                }
                alt={pokemon.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority={true}
              />
            </div>
            <div className="text-center sm:text-left">
              <Heading1 className="mb-2 capitalize">{pokemon.name}</Heading1>
              <Paragraph className="mb-1">
                <span className="font-bold">Height:</span> {pokemon.height * 10} cm
              </Paragraph>
              <Paragraph className="mb-1">
                <span className="font-bold">Weight:</span> {(pokemon.weight / 10).toFixed(1)} kg
              </Paragraph>

              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {pokemon.types.map(type => (
                  <span
                    key={type.type.name}
                    className={clsx(
                      "rounded-full px-3 py-1 text-xs font-semibold text-white uppercase",
                      typeColors[type.type.name],
                    )}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Base stats and abilities */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <Heading2 className="mb-4">Base Stats</Heading2>
              <PokemonStats stats={pokemon.stats} />
            </div>
            <div>
              <Heading2 className="mb-4">Abilities</Heading2>
              <PokemonAbilities abilities={pokemon.abilities} />
            </div>
          </div>

          {/* Location Area */}
          <div className="mt-8">
            <Heading2 className="mb-4">Location Area</Heading2>
            <PokemonLocationAreas pokemonId={pokemonId} />
          </div>

          {/* Moves */}
          <div className="mt-8">
            <Heading2 className="mb-4">Moves</Heading2>
            <PokemonMoves moves={pokemon.moves} />
          </div>

          {/* Evolution chain */}
          {species && (
            <div className="mt-8">
              <Heading2 className="mb-4">Evolution Chain</Heading2>
              <PokemonEvolution speciesUrl={species.evolution_chain.url} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
