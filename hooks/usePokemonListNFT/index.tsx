import { useContract } from "hooks/useContract"
import { ICharacterData, transformCharacterData } from "lib/getNftMetadata"
import { useEffect, useState } from "react"

export const usePokemonListNFT = (address: string | undefined) => {
  const { gameContract } = useContract()
  const [pokemons, setPokemons] = useState<ICharacterData[]>()

  const getPokemons = async () => {
    try {
      if (!gameContract) return

      const charactersTxn = await gameContract.getCharacters(address)

      const pokemonList = charactersTxn.map((characterData: any) =>
        transformCharacterData(characterData)
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
