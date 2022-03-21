import { StarterCard } from "components/PokemonCards/StarterCard"
import { usePokemon } from "hooks/usePokemon"
import { transformPokemonData } from "lib/getNftMetadata"
import toast from "react-hot-toast"
import { useContractEvent } from "hooks/useContractEvent"
import { FC, useState } from "react"
import Popup from "reactjs-popup"
import { BiLoaderAlt } from "react-icons/bi"
import { v4 as uuidv4 } from "uuid"
import type { Contract } from "ethers"

import { POKEMON_GAME_ADDRESS } from "config"
import PokemonGameContract from "hardhat/artifacts/contracts/Pokemon/PokemonGame.sol/PokemonGame.json"
import { PokemonGame } from "hardhat/typechain/PokemonGame"
import { useContract } from "hooks/useContract"
import { motion } from "framer-motion"

interface ISelectPokemon {
  setPokemonSelected: any
}

export const SelectPokemon: FC<ISelectPokemon> = ({ setPokemonSelected }) => {
  const pokemonStarter = ["bulbasaur", "charmander", "squirtle"]
  const [isMinted, setIsMinted] = useState(false)
  const { contract: gameContract } = useContract<PokemonGame & Contract>({
    contractAddress: POKEMON_GAME_ADDRESS,
    contractJson: PokemonGameContract
  })

  const mintCharacterNFTAction = async (pokemonId: number | undefined) => {
    try {
      if (!gameContract) return

      setIsMinted(true)
      const mintTxn = await gameContract.mint(pokemonId)
      await mintTxn.wait()
      toast.success("pokemon minted")
      setIsMinted(false)
    } catch (error) {
      toast.error("Mint Failed")
      setIsMinted(false)
    }
  }

  const getPokemonMint = async () => {
    if (gameContract) {
      const characterNFT = await gameContract.hasNft()

      if (!characterNFT.info.id.toNumber()) return

      const pokemonNFT = transformPokemonData(characterNFT)
      setPokemonSelected(pokemonNFT)
    }
  }

  const onPokemonMint = (sender: string, tokenId: number, pokemonId: number) => {
    getPokemonMint()
  }

  useContractEvent<Contract>({
    contract: gameContract,
    eventName: "PokemonNFTMinted",
    listener: onPokemonMint
  })

  const variants = {
    visible: (i:any) => ({
      opacity: 1,
      transition: {
        delay: i * 0.3
      }
    })
  }

  return (
    <div className="flex flex-col gap-2 xs:items-center">
      <h4 className="text-xl font-bold text-white">Select Character</h4>
      <div className="flex flex-wrap gap-4 xs:justify-center">
        {pokemonStarter && pokemonStarter.map((name, index) => {
          const { id, stats, sprites, types, isLoading, isSuccess } = usePokemon({ name: name })

          const specificStats = stats && stats.filter((stat) => (
            (stat.name === "hp" || stat.name === "attack" || stat.name === "defense") && stat
          ))

          return (
            <motion.button
              custom={index}
              initial={{ opacity: 0 }}
              animate="visible"
              variants={variants}
              key={uuidv4()}
              onClick={() => mintCharacterNFTAction(id)}>
              {isSuccess &&
                <StarterCard key={id} id={id} name={name} stats={specificStats} types={types} sprites={sprites} />
              }
            </motion.button>
          )
        })}
      </div>
      <Popup open={isMinted} overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <div className="flex flex-col p-4 bg-white rounded-md">
          <div className="flex items-center justify-center gap-2">
            <BiLoaderAlt className="animate-spin" color="black" />
            <span>Minting NFT...</span>
          </div>
        </div>
      </Popup>
    </div>
  )
}
