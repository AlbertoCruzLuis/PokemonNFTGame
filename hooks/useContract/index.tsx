import { MY_EPIC_GAME_ADDRESS } from "config"
import MyEpicGameContract from "hardhat/artifacts/contracts/MyEpicGame.sol/MyEpicGame.json"
import { useWeb3 } from "@3rdweb/hooks"
import { MyEpicGame } from "hardhat/typechain/MyEpicGame"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

interface IContract {
  gameContract: MyEpicGame
}

export const useContract = (): IContract => {
  const { provider } = useWeb3()
  const signer = provider?.getSigner()
  const [gameContract, setGameContract] = useState<MyEpicGame>(null)

  useEffect(() => {
    if (provider) {
      const contract = new ethers.Contract(
        MY_EPIC_GAME_ADDRESS,
        MyEpicGameContract.abi,
        signer
      )
      setGameContract(contract)
    }
  }, [provider])

  /* const gameContract = useContractWagmi<MyEpicGame>({
    addressOrName: MY_EPIC_GAME_ADDRESS,
    contractInterface: MyEpicGameContract.abi,
    signerOrProvider: signer
  }) */

  return { gameContract }
}
