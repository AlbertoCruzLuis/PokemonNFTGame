import { POKEAPI_URL } from "../config"
import fetch from 'node-fetch'

export const CATEGORY = {
  HEALING: 27
}

export const fetchItemsOfCategory = async (categoryId: number) => {
  const response = await fetch(
    `${POKEAPI_URL}item-category/${categoryId}/`
  )
  return await response.json()
}
