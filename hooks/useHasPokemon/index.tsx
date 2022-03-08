import { useContract } from "hooks/useContract"
import { ICharacterData, transformCharacterData } from "lib/getNftMetadata"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

interface IuseHasPokemon {
  pokemonSelected: ICharacterData | null,
  setPokemonSelected: Dispatch<SetStateAction<ICharacterData | null>>
}

export const useHasPokemon = (): IuseHasPokemon => {
  const { gameContract } = useContract()
  const [pokemonSelected, setPokemonSelected] = useState<ICharacterData | null>(null)

  const hasPokemon = async () => {
    if (!gameContract) return

    const txn = await gameContract.checkIfUserHasNFT()

    if (!txn.name) return

    console.log("User has character NFT")
    setPokemonSelected(transformCharacterData(txn))
  }

  useEffect(() => {
    hasPokemon()
  }, [gameContract])

  return {
    pokemonSelected,
    setPokemonSelected
  }
}
