import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { fetchAllHealing } from "services/PokeAPI/Items/Healing"

export interface IHealing {
  id: number,
  name: string,
  description: string,
  sprite: string,
  cost: number
}

export interface IuseAllHealing {
  healings: IHealing[] | undefined,
  isLoading: boolean,
  isSuccess: boolean
}

export const useAllHealing = (): IuseAllHealing => {
  const [healings, setHealings] = useState<IHealing[]>()
  const { data, isSuccess, isLoading } = useQuery("healing", fetchAllHealing)

  useEffect(() => {
    if (isSuccess) {
      const newHealings = data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          description: item.effect_entries[0].effect,
          sprite: item.sprites.default,
          cost: item.cost
        }
      })
      setHealings(newHealings)
    }
  }, [data])

  return {
    healings,
    isLoading,
    isSuccess
  }
}
