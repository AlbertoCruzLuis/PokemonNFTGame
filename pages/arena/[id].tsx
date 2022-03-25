import type { NextPage } from "next"
import { useBoss } from "hooks/useBoss"
import { useContractEvent } from "hooks/useContractEvent"
import type { BigNumber, Contract } from "ethers"
import { useHasPokemon } from "hooks/useHasPokemon"
import { BattleCard } from "components/PokemonCards/BattleCard"
import { useEffect, useState } from "react"
import Popup from "reactjs-popup"
import { LevelUp } from "components/LevelUp"
import toast from "react-hot-toast"

import { POKEMON_ATTACK_ADDRESS } from "config"
import PokemonAttackContract from "hardhat/artifacts/contracts/Pokemon/PokemonAttack.sol/PokemonAttack.json"
import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useContract } from "hooks/useContract"
import { useWeb3 } from "@3rdweb/hooks"
import dayjs from "dayjs"
import { motion } from "framer-motion"
import Head from "next/head"
import Image from "next/image"
import { VersusScreen } from "content/VersusScreen"
import { middleStringTruncate } from "utils/middleStringTruncate"
import { GiBroadsword } from "react-icons/gi"
import { useRouter } from "next/router"
import { useAllBosses } from "hooks/useAllBosses"
import { CustomImage } from "components/CustomImage"

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

const Arena: NextPage = () => {
  const { address } = useWeb3()
  const router = useRouter()
  const id = parseInt(router.query.id as string, 10)
  const { bosses } = useAllBosses()

  const isValidUrl = () => {
    if (!bosses || bosses.length === 0) return false

    for (const boss of bosses) {
      if (boss.id === id) {
        return true
      }
    }
    return false
  }

  useEffect(() => {
    if (!bosses || bosses.length > 0) {
      const isValid = isValidUrl()
      !isValid && router.push("/404")
    }
  }, [bosses])

  const { contract: pokemonAttackContract } = useContract<PokemonGame & Contract>({
    contractAddress: POKEMON_ATTACK_ADDRESS,
    contractJson: PokemonAttackContract
  })
  const { boss, setBoss, runAttackAction } = useBoss(id)
  const { pokemonSelected, setPokemonSelected } = useHasPokemon()
  const [isLevelUp, setIsLevelUp] = useState<boolean>(false)
  const [attributes, setAtributes] = useState<IAtributtes>()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  const onAttackComplete = (newBossHp: BigNumber, newPlayerHp: BigNumber, sender: string, timestamp: BigNumber) => {
    if (sender !== address) return

    const eventDate = timestamp.toNumber()
    const diffTime = dayjs().unix() - eventDate

    if (diffTime > 5) return

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

  const onLevelUp = (levels: BigNumber, stats: any, sender: string, timestamp: BigNumber) => {
    if (sender !== address) return

    const eventDate = timestamp.toNumber()
    const diffTime = dayjs().unix() - eventDate

    if (diffTime > 5) return

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

  const onBattleComplete = (status: number, sender: string, timestamp: BigNumber) => {
    if (sender !== address) return

    const eventDate = timestamp.toNumber()
    const diffTime = dayjs().unix() - eventDate

    if (diffTime > 5) return

    if (status === BattleStatus.WIN) {
      toast.success("You are Winner")
    } else {
      toast.error("You are Lost")
    }
  }

  useContractEvent<Contract>({
    contract: pokemonAttackContract,
    eventName: "AttackComplete",
    listener: onAttackComplete
  })

  useContractEvent<Contract>({
    contract: pokemonAttackContract,
    eventName: "LevelUp",
    listener: onLevelUp
  })

  useContractEvent<Contract>({
    contract: pokemonAttackContract,
    eventName: "BattleComplete",
    listener: onBattleComplete
  })

  const variants = {
    visible: (i:any) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 1.4
      }
    })
  }

  return (
    <>
      <Head>
        <title>PokemonNFT - Arena</title>
      </Head>
      <div className="flex flex-col items-center justify-center gap-4">
        { address && boss && pokemonSelected && isLoading &&
        <VersusScreen
          imageUriP1={boss.imageURI}
          imageUriP2={pokemonSelected.imageURI}
          walletP1={"Boss"}
          walletP2={middleStringTruncate(address, 4, 4)}
        />
        }
        { !isLoading &&
        <div className="relative w-[100%] h-[40rem]">
          <Image
            src="/assets/BattleArena.jpg"
            layout="fill"
            objectFit="cover"
            quality={100} />
          <motion.div
            className="absolute z-10 top-1 right-1"
            custom={4}
            initial={{ opacity: 0 }}
            animate="visible"
            variants={variants}>
            { boss && <BattleCard
              name={boss.name}
              hp={boss.hp}
              maxHp={boss.maxHp}
              level={boss.level}
              experience={boss.experience} />}
          </motion.div>
          <div>
            <motion.div
              className="absolute z-10 bottom-1 left-1"
              custom={3}
              initial={{ opacity: 0 }}
              animate="visible"
              variants={variants}>
              {pokemonSelected && <BattleCard
                name={pokemonSelected.name}
                hp={pokemonSelected.hp}
                maxHp={pokemonSelected.maxHp}
                level={pokemonSelected.level}
                experience={pokemonSelected.experience} />}
            </motion.div>
            <button className="absolute z-10 flex items-center gap-2 p-3 border-2 border-yellow-400 border-solid bottom-1 right-1 bg-gradient-to-t from-black to-yellow-500 max-w-max" onClick={() => runAttackAction(0, id)}>
              <GiBroadsword color="white" />
            </button>
          </div>
          <motion.div
            className="absolute bottom-[27%] w-[50%] left-[48%] right-[48%]"
            custom={3}
            initial={{ opacity: 0 }}
            animate="visible"
            variants={variants}>
            { boss && <CustomImage
              imageURI={boss.imageURI}
              width={200}
              height={200}
            />}
          </motion.div>
          <motion.div
            className="absolute bottom-[5%] w-[50%] left-[32%] right-[32%]"
            custom={1}
            initial={{ opacity: 0 }}
            animate="visible"
            variants={variants}>
            {pokemonSelected && <CustomImage
              imageURI={pokemonSelected.imageURI}
              width={200}
              height={200}
            />}
          </motion.div>
        </div>
        }
        <Popup open={isLevelUp} overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <LevelUp attributes={attributes} />
        </Popup>
      </div>
    </>
  )
}

export default Arena
