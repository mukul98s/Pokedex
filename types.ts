export type Pokemon = {
  name: string;
  url: string;
  id: number;
  image: string;
};

export type PokemonMove = {
  move: {
    name: string;
  };
};

export type GetPokemonsResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

export type PokemonAbility = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type EvolutesTo = {
  species: {
    url: string;
    name: string;
  };
  evolves_to: EvolutesTo[];
};

type EvolutionChain = {
  species: {
    url: string;
    name: string;
  };
  evolves_to: EvolutesTo[];
};

export type GetPokemonEvolutionResponse = {
  chain: EvolutionChain;
};

export type PokemonSpecies = {
  id: number;
  name: string;
  evolution_chain: {
    url: string;
  };
};

export type PokemonSpeciesResponse = PokemonSpecies;

export type PokemonData = {
  id: number;
  name: string;
  image: string;
  url: string;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  moves: PokemonMove[];
  species: PokemonSpecies;
  sprites: PokemonSprites;
  height: number;
  weight: number;
  types: PokemonType[];
};

export type PokemonSprites = {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
};

export type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonDataResponse = PokemonData;

export type PokemonLocationArea = {
  location_area: {
    name: string;
    url: string;
  };
};

export type PokemonLocationAreasResponse = Array<PokemonLocationArea>;

export interface GetPokemonsParams {
  page: number;
  query?: string;
}
