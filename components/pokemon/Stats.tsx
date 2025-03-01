import { PokemonStat } from "@/types";
import clsx from "clsx";
import Paragraph from "@/components/typography/Paragraph";

interface PokemonStatsProps {
  stats: PokemonStat[];
}

const getStatColor = (statName: string) => {
  switch (statName) {
    case "hp":
      return {
        bg: "bg-red-500",
        ring: "ring-red-500/30",
      };
    case "attack":
      return {
        bg: "bg-orange-500",
        ring: "ring-orange-500/30",
      };
    case "defense":
      return {
        bg: "bg-yellow-500",
        ring: "ring-yellow-500/30",
      };
    case "special-attack":
      return {
        bg: "bg-blue-500",
        ring: "ring-blue-500/30",
      };
    case "special-defense":
      return {
        bg: "bg-green-500",
        ring: "ring-green-500/30",
      };
    case "speed":
      return {
        bg: "bg-pink-500",
        ring: "ring-pink-500/30",
      };
    default:
      return {
        bg: "bg-gray-500",
        ring: "ring-gray-500/30",
      };
  }
};

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="space-y-2">
      {stats.map(stat => {
        const statColor = getStatColor(stat.stat.name);

        return (
          <div key={stat.stat.name}>
            <Paragraph className="text-sm capitalize">
              {stat.stat.name.replace("-", " ")}
            </Paragraph>

            <div className="group flex w-full items-center gap-4">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={clsx("relative h-2 rounded-full", statColor.bg)}
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                >
                  <div
                    className={clsx(
                      "absolute -top-1/4 right-0 size-2 translate-y-1/4 rounded-full ring-2 ring-offset-2",
                      statColor.ring,
                    )}
                  ></div>
                </div>
              </div>
              <Paragraph className="w-4 text-right text-sm">
                {stat.base_stat}
              </Paragraph>
            </div>
          </div>
        );
      })}
    </div>
  );
}
