import type { NextPage } from "next"
import { useBoss } from "hooks/useBoss"
import { useContractEvent } from "hooks/useContractEvent"
import type { BigNumber, Contract } from "ethers"
import { useHasPokemon } from "hooks/useHasPokemon"
import { useContract } from "hooks/useContract"
import { BattleCard } from "components/PokemonCards/BattleCard"
import { useState } from "react"
import { MyEpicGame } from "hardhat/typechain"
import Popup from "reactjs-popup"
import { LevelUp } from "components/LevelUp"
import toast from "react-hot-toast"

interface IAtributtes {
  level: number,
  hp: number,
  maxHp: number,
  attackDamage: number
}

const Arena: NextPage = () => {
  const { gameContract } = useContract()
  const { boss, setBoss, runAttackAction, attackState } = useBoss()
  const { pokemonSelected, setPokemonSelected } = useHasPokemon()
  const [isLevelUp, setIsLevelUp] = useState<boolean>(false)
  const [attributes, setAtributes] = useState<IAtributtes>()

  const onAttackComplete = (newBossHp: BigNumber, newPlayerHp: BigNumber) => {
    const bossHp = newBossHp.toNumber()
    const playerHp = newPlayerHp.toNumber()

    console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`)

    setBoss((prevState: any) => {
      return { ...prevState, hp: bossHp }
    })

    setPokemonSelected((prevState: any) => {
      return { ...prevState, hp: playerHp }
    })
  }

  const onLevelUp = (newLevel: BigNumber, stats: any) => {
    console.log("stats", stats)
    const hp = stats.hp.toNumber()
    const maxHp = stats.maxHp.toNumber()
    const attackDamage = stats.attackDamage.toNumber()
    const level = newLevel.toNumber()

    setAtributes({
      level,
      hp,
      maxHp,
      attackDamage
    })
    setIsLevelUp(true)

    setPokemonSelected((prevState: any) => {
      return {
        ...prevState,
        level: level,
        hp: hp,
        maxHp: maxHp,
        attackDamage: attackDamage
      }
    })

    setTimeout(() => {
      setIsLevelUp(false)
    }, 4000)
  }

  const onPlayerWin = () => {
    toast.success("You are Winner")
  }

  const onPlayerLose = () => {
    toast.error("You are Lost")
  }

  useContractEvent<MyEpicGame | Contract>({
    contract: gameContract,
    eventName: "AttackComplete",
    listener: onAttackComplete
  })

  useContractEvent<MyEpicGame | Contract>({
    contract: gameContract,
    eventName: "LevelUp",
    listener: onLevelUp
  })

  useContractEvent<MyEpicGame | Contract>({
    contract: gameContract,
    eventName: "PlayerWin",
    listener: onPlayerWin
  })

  useContractEvent<MyEpicGame | Contract>({
    contract: gameContract,
    eventName: "PlayerLose",
    listener: onPlayerLose
  })

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {pokemonSelected && <BattleCard
        name={pokemonSelected.name}
        imageURI={pokemonSelected.imageURI}
        hp={pokemonSelected.hp}
        maxHp={pokemonSelected.maxHp}
        level={pokemonSelected.level}
        experience={pokemonSelected.experience} />}

      <span className="text-white">{attackState}</span>

      { boss && <BattleCard
        name={boss.name}
        imageURI={boss.imageURI}
        hp={boss.hp}
        maxHp={boss.maxHp}
        level={boss.level}
        experience={boss.experience} />}

      <button className="flex items-center gap-2 p-2 px-8 border-2 border-yellow-400 border-solid bg-gradient-to-t from-black to-yellow-500 max-w-max" onClick={runAttackAction}>
        <span className="font-semibold text-white">Attack</span>
      </button>
      <Popup open={isLevelUp} overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <LevelUp attributes={attributes} />
      </Popup>
    </div>
  )
}

export default Arena
