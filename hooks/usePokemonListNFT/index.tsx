import { useContract } from "hooks/useContract"
import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"
import { useEffect, useState } from "react"

export const usePokemonListNFT = (address: string | undefined) => {
  const { gameContract } = useContract()
  const [pokemons, setPokemons] = useState<IPokemonData[]>()

  const getPokemons = async () => {
    try {
      if (!gameContract) return

      const pokemonListRaw = await gameContract.getPokemonsOf(address)

      const pokemonList = pokemonListRaw.map((pokemonData: any) =>
        transformPokemonData(pokemonData)
      )

      setPokemons(pokemonList)
    } catch (error) {
      console.error("Something went wrong fetching characters:", error)
    }
  }

  useEffect(() => {
    if (gameContract) {
      getPokemons()
    }
  }, [gameContract])

  return { pokemons, setPokemons }
}
