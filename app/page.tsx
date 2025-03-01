import PokemonCard from "@/components/pokemon/Card";
import { getPokemons } from "./lib/pokemon";
import Link from "next/link";
import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon, Search, X } from "lucide-react";
import Heading1 from "@/components/typography/Heading1";
import { PageProps } from "@/.next/types/app/page";

import { Metadata } from "next";
import { cache } from "react";

const getCachedPokemons = cache(getPokemons);

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { query, page } = await searchParams;

  const {pokemons} = await getCachedPokemons({
    page: page ? parseInt(page) : 1,
    query: query || "",
  });

  return {
    title: "Pokédex",
    description: "Pokédex - Search for your favorite Pokémon",
    openGraph: {
      title: "Pokédex",
      description: "Pokédex - Search for your favorite Pokémon  ",
      images: [{ url: pokemons[0].image }],
    },
  };
}

export default async function Home({
  searchParams,
}: PageProps) {
  const {query, page} = await searchParams;

  const { pokemons, nextPage, previousPage } = await getCachedPokemons({
    page: page ? parseInt(page) : 1,
    query: query || "",
  });

  return (
    <main className="px-4 py-8">
      <Heading1 className="mb-8 text-center">Pokédex</Heading1>

      {/* Search */}
      <div className="relative mx-auto mb-8 max-w-md">
        <form className="group flex items-center gap-1 rounded-lg border border-gray-300 px-2 focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500">
          <Search className="size-5 text-gray-400" />
          <input
            name="query"
            type="text"
            placeholder="Search Pokémon by name"
            defaultValue={query || ""}
            className="w-full p-2 outline-none focus:ring-0"
          />
          {page && <input type="hidden" name="page" value={page} />}
        </form>
        {query && (
          <Link
            href="/"
            className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="size-5" />
          </Link>
        )}
      </div>

      {/* Pokémons */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination */}
      {!query && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            className={clsx(
              "flex items-center text-blue-500 hover:underline",
              !previousPage &&
                "pointer-events-none cursor-not-allowed opacity-75",
            )}
            href={getPaginationUrl(previousPage)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
          </Link>
          <Link
            className={clsx(
              "flex items-center text-blue-500 hover:underline",
              !nextPage && "pointer-events-none cursor-not-allowed opacity-75",
            )}
            href={getPaginationUrl(nextPage)}
          >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Clear search */}
      {query && (
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300"
          >
            Clear search
          </Link>
        </div>
      )}
    </main>
  );
}

function getPaginationUrl(page: number | null) {
  const params = new URLSearchParams();
  if (page) params.set("page", page.toString());
  return `/?${params.toString()}`;
}
