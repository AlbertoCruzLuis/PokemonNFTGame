import { useContract } from "hooks/useContract"
import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IuseHasPokemon {
  pokemonSelected: IPokemonData | null,
  setPokemonSelected: Dispatch<SetStateAction<IPokemonData | null>>
}

export const useHasPokemon = (): IuseHasPokemon => {
  const { gameContract } = useContract()
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
