import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/PokemonGame.sol/PokemonGame.json"
import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useContract } from "hooks/useContract"

interface IuseHasPokemon {
  pokemonSelected: IPokemonData | null,
  setPokemonSelected: Dispatch<SetStateAction<IPokemonData | null>>
}

export const useHasPokemon = (): IuseHasPokemon => {
  const { contract: gameContract } = useContract<PokemonGame>({
    contractAddress: POKEMON_GAME_ADDRESS,
    contractJson: PokemonGameContract
  })
  const [pokemonSelected, setPokemonSelected] = useState<IPokemonData | null>(null)

  const hasPokemon = async () => {
    if (!gameContract) return

    const pokemonNft = await gameContract.hasNft()

    if (!pokemonNft.info.id.toNumber()) return

    console.log("User has character NFT")
    setPokemonSelected(transformPokemonData(pokemonNft))
  }

  useEffect(() => {
    hasPokemon()
  }, [gameContract])

  return {
    pokemonSelected,
    setPokemonSelected
  }
}
