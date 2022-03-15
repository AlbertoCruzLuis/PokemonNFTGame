import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"
import { useEffect, useState } from "react"

import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/PokemonGame.sol/PokemonGame.json"
import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useContract } from "hooks/useContract"
import { Contract } from "ethers"

enum ATTACK_STATE {
  attacking = "attacking",
  hit = "hit",
  none = ""
}

export const useBoss = (id: number) => {
  const { contract: gameContract } = useContract<Contract>({
    contractAddress: POKEMON_GAME_ADDRESS,
    contractJson: PokemonGameContract
  })
  const [boss, setBoss] = useState<IPokemonData>()
  const [attackState, setAttackState] = useState("")

  const getBoss = async () => {
    if (gameContract) {
      const bossRaw = await gameContract.getBoss(id)
      const boss = await gameContract.getPokemonReadable(bossRaw)
      setBoss(transformPokemonData(boss))
    }
  }

  const runAttackAction = async (pokemonIndex: number, bossId: number) => {
    try {
      if (gameContract) {
        setAttackState(ATTACK_STATE.attacking)
        console.log("Attacking boss...")
        const attackTxn = await gameContract.attackBoss(pokemonIndex, bossId)
        await attackTxn.wait()
        console.log("attackTxn:", attackTxn)
        setAttackState(ATTACK_STATE.hit)
      }
    } catch (error) {
      console.error("Error attacking boss:", error)
      setAttackState(ATTACK_STATE.none)
    }
  }

  useEffect(() => {
    if (gameContract) {
      getBoss()
    }
  }, [gameContract])

  return { boss, setBoss, runAttackAction, attackState }
}
