import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/Pokemon/PokemonGame.sol/PokemonGame.json"
import { useContract } from "hooks/useContract"
import { Contract } from "ethers"

interface IuseHasPokemon {
  pokemonSelected: IPokemonData | null,
  setPokemonSelected: Dispatch<SetStateAction<IPokemonData | null>>
}

export const useHasPokemon = (): IuseHasPokemon => {
  const { contract: gameContract } = useContract<Contract>({
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
