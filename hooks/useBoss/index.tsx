import { IPokemonData, transformPokemonData } from "lib/getNftMetadata"
import { useEffect, useState } from "react"

import { POKEMON_GAME_ADDRESS, POKEMON_ATTACK_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/Pokemon/PokemonGame.sol/PokemonGame.json"
import PokemonAttackContract from "hardhat/artifacts/contracts/Pokemon/PokemonAttack.sol/PokemonAttack.json"

import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useContract } from "hooks/useContract"
import { Contract } from "ethers"

enum ATTACK_STATE {
  attacking = "attacking",
  hit = "hit",
  none = ""
}

export const useBoss = (id: number) => {
  const { contract: pokemonAttackContract } = useContract<PokemonGame & Contract>({
    contractAddress: POKEMON_ATTACK_ADDRESS,
    contractJson: PokemonAttackContract
  })

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
      if (!gameContract || !pokemonAttackContract) return

      setAttackState(ATTACK_STATE.attacking)

      const attackTxn = await pokemonAttackContract.attackBoss(pokemonIndex, bossId)
      await attackTxn.wait()

      setAttackState(ATTACK_STATE.hit)
    } catch (error) {
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
