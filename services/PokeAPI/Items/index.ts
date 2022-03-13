import { POKEAPI_URL } from "config"

export const fetchItem = async (itemId: number) => {
  const response = await fetch(
    `${POKEAPI_URL}item/${itemId}/`
  )
  return await response.json()
}
