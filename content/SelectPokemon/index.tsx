import { StarterCard } from "components/PokemonCards/StarterCard"
import { usePokemon } from "hooks/usePokemon"
import { useContract } from "hooks/useContract"
import { transformCharacterData } from "lib/getNftMetadata"
import toast from "react-hot-toast"
import { useContractEvent } from "hooks/useContractEvent"
import { MyEpicGame } from "hardhat/typechain"
import { useState } from "react"
import Popup from "reactjs-popup"
import { BiLoaderAlt } from "react-icons/bi"
import { v4 as uuidv4 } from "uuid"

export const SelectPokemon = ({ setPokemonSelected }) => {
  const pokemonStarter = ["bulbasaur", "charmander", "squirtle"]
  const [isLoading, setIsLoading] = useState(false)
  const { gameContract } = useContract()

  const mintCharacterNFTAction = async (characterId: number) => {
    try {
      if (gameContract) {
        setIsLoading(true)
        const mintTxn = await gameContract.mintCharacterNFT(characterId)
        await mintTxn.wait()
        toast.success("pokemon minted")
        setIsLoading(false)
      }
    } catch (error) {
      toast.error("Mint Failed")
      setIsLoading(false)
    }
  }

  const onCharacterMint = async (sender: string, tokenId: number, characterIndex: number) => {
    if (gameContract) {
      const characterNFT = await gameContract.checkIfUserHasNFT()
      const pokemonNFT = transformCharacterData(characterNFT)
      setPokemonSelected(pokemonNFT)
    }
  }

  const gameContractEvent = useContractEvent<MyEpicGame>({
    contract: gameContract,
    eventName: "CharacterNFTMinted",
    listener: onCharacterMint
  })

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xl font-bold text-white">Select Character</h4>
      <div className="flex flex-wrap gap-4">
        {pokemonStarter && pokemonStarter.map((name) => {
          const { id, stats, sprites, types, isLoading, isSuccess } = usePokemon({ name: name })

          const specificStats = stats && stats.filter((stat) => (
            (stat.name === "hp" || stat.name === "attack" || stat.name === "defense") && stat
          ))

          return (
            <button key={uuidv4()} onClick={() => mintCharacterNFTAction(id)}>
              {isSuccess &&
                <StarterCard key={id} id={id} name={name} stats={specificStats} types={types} sprites={sprites} />
              }
            </button>
          )
        })}
      </div>
      <Popup open={isLoading} overlayStyle={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
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
