import type { NextPage } from "next"
import { useBoss } from "hooks/useBoss"
import { useContractEvent } from "hooks/useContractEvent"
import type { BigNumber, Contract } from "ethers"
import { useHasPokemon } from "hooks/useHasPokemon"
import { BattleCard } from "components/PokemonCards/BattleCard"
import { useState } from "react"
import Popup from "reactjs-popup"
import { LevelUp } from "components/LevelUp"
import toast from "react-hot-toast"

import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/Pokemon/PokemonGame.sol/PokemonGame.json"
import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useContract } from "hooks/useContract"

interface IAtributtes {
  level: number,
  hp: number,
  maxHp: number,
  attack: number
}

enum BattleStatus {
  WIN,
  LOST
}

const bosses = {
  mewtwo: 150
}

const Arena: NextPage = () => {
  const { contract: gameContract } = useContract<PokemonGame & Contract>({
    contractAddress: POKEMON_GAME_ADDRESS,
    contractJson: PokemonGameContract
  })
  const { boss, setBoss, runAttackAction, attackState } = useBoss(bosses.mewtwo)
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

  const onLevelUp = (levels: BigNumber, stats: any) => {
    const hp = stats.hp.toNumber()
    const maxHp = stats.maxHp.toNumber()
    const attack = stats.attack.toNumber()
    const level = levels.toNumber()

    setAtributes({
      level,
      hp,
      maxHp,
      attack
    })
    setIsLevelUp(true)

    setPokemonSelected((prevState: any) => {
      return {
        ...prevState,
        level: level,
        hp: hp,
        maxHp: maxHp,
        attack: attack
      }
    })

    setTimeout(() => {
      setIsLevelUp(false)
    }, 4000)
  }

  const onBattleComplete = (status: number) => {
    if (status === BattleStatus.WIN) {
      toast.success("You are Winner")
    } else {
      toast.error("You are Lost")
    }
  }

  useContractEvent<Contract>({
    contract: gameContract,
    eventName: "AttackComplete",
    listener: onAttackComplete
  })

  useContractEvent<Contract>({
    contract: gameContract,
    eventName: "LevelUp",
    listener: onLevelUp
  })

  useContractEvent<Contract>({
    contract: gameContract,
    eventName: "BattleComplete",
    listener: onBattleComplete
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

      <button className="flex items-center gap-2 p-2 px-8 border-2 border-yellow-400 border-solid bg-gradient-to-t from-black to-yellow-500 max-w-max" onClick={() => runAttackAction(0, bosses.mewtwo)}>
        <span className="font-semibold text-white">Attack</span>
      </button>
      <Popup open={isLevelUp} overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <LevelUp attributes={attributes} />
      </Popup>
    </div>
  )
}

export default Arena
