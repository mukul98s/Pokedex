import {
  GetPokemonEvolutionResponse,
  GetPokemonsParams,
  GetPokemonsResponse,
  Pokemon,
  PokemonDataResponse,
  PokemonLocationAreasResponse,
  PokemonSpeciesResponse,
} from "@/types";
import axios, { AxiosError } from "axios";
import { notFound } from "next/navigation";

const axiosClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 5000,
});

async function fetchPokemonResource<T>(
  endpoint: string,
  handleNotFound = true,
): Promise<T> {
  try {
    const res = await axiosClient.get<T>(endpoint);

    if (res.status !== 200) {
      return handleNotFound ? notFound() : (null as T);
    }

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404 && handleNotFound) {
        return notFound();
      }
      // More specific error handling
      if (error.code === "ECONNABORTED") {
        throw new Error("Request timeout. Please try again.");
      }
      if (error.code === "ERR_BAD_REQUEST") {
        throw new Error("Invalid request. Please try again.");
      }
    }
    // Re-throw with context
    throw new Error(
      `Failed to fetch from ${endpoint}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

export async function getPokemons({ page, query = "" }: GetPokemonsParams) {
  const ITEMS_PER_PAGE = 30;

  const offset = (page - 1) * ITEMS_PER_PAGE;

  const res = await fetchPokemonResource<GetPokemonsResponse>(
    `/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`,
  );

  // Map pokemons to include id and image
  let pokemons = res.results.map((pokemon: Pokemon) => {
    const id = pokemon.url.split("/").slice(-2, -1)[0];
    return {
      ...pokemon,
      id: parseInt(id),
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
  });

  // Filter pokemons by query
  if (query) {
    pokemons = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return {
    pokemons,
    total: res.count,
    previousPage: calculatePageNumber(res.previous, ITEMS_PER_PAGE),
    nextPage: calculatePageNumber(res.next, ITEMS_PER_PAGE),
  };
}

/**
 * Get detailed data for a specific Pokemon
 */
export async function getPokemonData(id: string) {
  return fetchPokemonResource<PokemonDataResponse>(`/pokemon/${id}`);
}

/**
 * Get species information for a Pokemon
 */
export async function getPokemonSpecies(id: string) {
  return fetchPokemonResource<PokemonSpeciesResponse>(`/pokemon-species/${id}`);
}

/**
 * Get evolution chain data for a Pokemon
 */
export async function getPokemonEvolution(id: string) {
  return fetchPokemonResource<GetPokemonEvolutionResponse>(
    `/evolution-chain/${id}`,
  );
}

/**
 * Get location areas where a Pokemon can be found
 */
export async function getPokemonLocationAreas(id: string) {
  // Encounters endpoint returns an empty array rather than 404 when no locations exist
  return fetchPokemonResource<PokemonLocationAreasResponse>(
    `/pokemon/${id}/encounters`,
  );
}

/**
 * Calculate the page number for pokemon list
 */
const calculatePageNumber = (
  url: string | null,
  itemsPerPage: number,
): number | null => {
  if (!url) return null;

  const offset = Number(new URL(url).searchParams.get("offset"));
  return Math.floor(offset / itemsPerPage) + 1;
};
