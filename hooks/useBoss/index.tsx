import { useContract } from "hooks/useContract"
import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"
import { useEffect, useState } from "react"

enum ATTACK_STATE {
  attacking = "attacking",
  hit = "hit",
  none = ""
}

export const useBoss = () => {
  const { gameContract } = useContract()
  const [boss, setBoss] = useState<IPokemonData>()
  const [attackState, setAttackState] = useState("")

  const getBoss = async () => {
    if (gameContract) {
      const bossRaw = await gameContract.getBoss()
      const boss = await gameContract.getPokemonReadable(bossRaw)
      setBoss(transformPokemonData(boss))
    }
  }

  const runAttackAction = async (pokemonIndex: number) => {
    try {
      if (gameContract) {
        setAttackState(ATTACK_STATE.attacking)
        console.log("Attacking boss...")
        const attackTxn = await gameContract.attackBoss(pokemonIndex)
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
