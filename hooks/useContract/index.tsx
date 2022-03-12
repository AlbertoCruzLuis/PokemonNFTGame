import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/PokemonGame.sol/PokemonGame.json"
import { useWeb3 } from "@3rdweb/hooks"
import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import type { Contract } from "ethers"

interface IContract {
  gameContract: PokemonGame | Contract | undefined
}

export const useContract = (): IContract => {
  const { provider } = useWeb3()
  const signer = provider?.getSigner()
  const [gameContract, setGameContract] = useState<PokemonGame | Contract>()

  useEffect(() => {
    if (provider && POKEMON_GAME_ADDRESS) {
      const contract = new ethers.Contract(
        POKEMON_GAME_ADDRESS,
        PokemonGameContract.abi,
        signer
      )
      setGameContract(contract)
    }
  }, [provider])

  /* const gameContract = useContractWagmi<PokemonGame>({
    addressOrName: POKEMON_GAME_ADDRESS,
    contractInterface: PokemonGameContract.abi,
    signerOrProvider: signer
  }) */

  return { gameContract }
}
