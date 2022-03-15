import { POKEAPI_URL } from "../config"
import fetch from 'node-fetch'

export const fetchItem = async (itemId: number) => {
  const response = await fetch(
    `${POKEAPI_URL}item/${itemId}/`
  )
  return await response.json()
}
