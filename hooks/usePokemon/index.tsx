import { useQuery } from "react-query"
import { fetchPokemon } from "services/PokeAPI"

type PokemonName = {
  name: string
}

export type Stat = {
  name: string,
  value: number
}

export type Pokemon = {
  id: number | undefined,
  types: string[] | undefined,
  stats: Stat[] | undefined,
  sprites: any,
  isLoading: boolean,
  isSuccess: boolean
}

export const usePokemon = ({ name }: PokemonName): Pokemon => {
  const { data, isSuccess, isLoading } = useQuery(["pokemon", name], fetchPokemon(name))

  return {
    id: data && data.id,
    types: data && data.types.map((type: any) => type.type.name),
    stats: data && data.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat
    })),
    sprites: data && data.sprites,
    isLoading,
    isSuccess
  }
}
