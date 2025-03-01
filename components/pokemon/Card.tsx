import Heading2 from "@/components/typography/Heading2"
import type { Pokemon } from "@/types"
import Image from "next/image"
import Link from "next/link"

interface Props {
  pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props) {
  return (
    <Link
      href={`/pokemon/${pokemon.id}`}
      prefetch
      className="group relative block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative flex flex-col items-center p-6 transition-transform duration-300 group-hover:translate-y-[-4px]">
        {/* Image container with hover effect */}
        <div className="relative mb-4 h-40 w-40 transform transition-transform duration-300 group-hover:scale-110">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-70"></div>
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-lg"
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium transition-all duration-300">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
          <Heading2 className="mt-1 text-xl font-bold capitalize text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
            {pokemon.name}
          </Heading2>

          {/* Animated underline on hover */}
          <div className="mx-auto mt-2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-pink-500 transition-all duration-300 group-hover:w-3/4"></div>
        </div>
      </div>
    </Link>
  )
}

