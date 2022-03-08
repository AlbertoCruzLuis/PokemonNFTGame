import { useEffect, useState } from "react"
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
  const [id, setId] = useState()
  const [types, setTypes] = useState()
  const [stats, setStats] = useState()
  const [sprites, setSprites] = useState()
  const { data, isSuccess, isLoading } = useQuery(["pokemon", name], fetchPokemon(name))

  useEffect(() => {
    if (isSuccess) {
      setId(data.id)
      setStats(data.stats.map((stat: any) => (
        {
          name: stat.stat.name,
          value: stat.base_stat
        }
      )))
      setTypes(data.types.map((type: any) => type.type.name))
      setSprites(data.sprites)
    }
  }, [data])

  return {
    id,
    types,
    stats,
    sprites,
    isLoading,
    isSuccess
  }
}
