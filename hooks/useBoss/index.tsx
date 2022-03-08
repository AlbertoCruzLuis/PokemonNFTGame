import { useContract } from "hooks/useContract"
import { ICharacterData, transformCharacterData } from "lib/getNftMetadata"
import { useEffect, useState } from "react"

enum ATTACK_STATE {
  attacking = "attacking",
  hit = "hit",
  none = ""
}

export const useBoss = () => {
  const { gameContract } = useContract()
  const [boss, setBoss] = useState<ICharacterData>()
  const [attackState, setAttackState] = useState("")

  const getBoss = async () => {
    const bossTxn = await gameContract.getBigBoss()
    console.log("Boss:", bossTxn)
    setBoss(transformCharacterData(bossTxn))
  }

  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState(ATTACK_STATE.attacking)
        console.log("Attacking boss...")
        const attackTxn = await gameContract.attackBoss()
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
