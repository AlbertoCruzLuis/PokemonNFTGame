import { POKEAPI_URL } from "config"
import axios from "axios"

export const getPokemon = async (name: string) => {
  await axios.get(`${POKEAPI_URL}pokemon/${name}`).then(
    res => {
      console.log(res.data)
      return res.data
    }
  ).catch(error => {
    return error
  })
}

export const fetchPokemon = (name: string) => {
  return async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    )
    return await response.json()
  }
}

export const fetchURL = async (url: string) => {
  const response = await fetch(url)
  return await response.json()
}
