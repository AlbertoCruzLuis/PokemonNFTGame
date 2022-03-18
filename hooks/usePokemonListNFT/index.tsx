import { useEffect, useState } from "react"
import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"

import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/Pokemon/PokemonGame.sol/PokemonGame.json"
import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useContract } from "hooks/useContract"
import { Contract } from "ethers"

export const usePokemonListNFT = (address: string | undefined) => {
  const { contract: gameContract } = useContract<Contract>({
    contractAddress: POKEMON_GAME_ADDRESS,
    contractJson: PokemonGameContract
  })
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
