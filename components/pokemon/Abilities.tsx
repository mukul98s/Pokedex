import { PokemonAbility } from "@/types";
import Paragraph from "@/components/typography/Paragraph";

interface Props {
  abilities: PokemonAbility[];
}

export default function PokemonAbilities({ abilities }: Props) {
  return (
    <ul className="space-y-2">
      {abilities.map(ability => (
        <li key={ability.ability.name} className="flex items-center">
          <Paragraph className="capitalize">
            {ability.ability.name.replace("-", " ")}
          </Paragraph>
          {ability.is_hidden && (
            <span className="ml-2 rounded-full bg-red-300 px-1 text-xs font-semibold text-white">
              Hidden
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
