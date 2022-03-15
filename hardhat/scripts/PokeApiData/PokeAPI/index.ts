import { POKEAPI_URL } from "./config"
import fetch from 'node-fetch';

export const fetchPokemon = async (name: string) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )
    return await response.json()
}

export const fetchURL = async (url: string) => {
  const response = await fetch(url)
  return await response.json()
}
