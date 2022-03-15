import { useEffect, useState } from "react"
import { IItemData, transformItemData, transformPokemonData } from "lib/getNftMetadata"

import { ITEM_ADDRESS, POKEMON_GAME_ADDRESS } from "config"
import ItemContract from "hardhat/artifacts/contracts/Item.sol/Item.json"
import { Item } from "hardhat/typechain"
import { useContract } from "hooks/useContract"
import { useWeb3 } from "@3rdweb/hooks"
import toast from "react-hot-toast"
import { useContractEvent } from "hooks/useContractEvent"
import { Contract } from "ethers"

export const useHealingListNFT = () => {
  const { address } = useWeb3()
  const { contract: itemContract } = useContract<Item>({
    contractAddress: ITEM_ADDRESS,
    contractJson: ItemContract
  })

  const [healings, setHealings] = useState<IItemData[]>()
  const [loadingStatus, setLoadingStatus] = useState(false)

  const getHealings = async () => {
    try {
      if (!itemContract) return

      const healingListRaw = await itemContract.getItemsOf(address)

      const healingList = healingListRaw.map((itemData: any) =>
        transformItemData(itemData)
      )

      setHealings(healingList)
    } catch (error) {
      console.error("Something went wrong fetching characters:", error)
    }
  }

  const useItem = async (itemId: number, pokemonIndex: number) => {
    try {
      setLoadingStatus(true)
      await itemContract?.useItem(POKEMON_GAME_ADDRESS, pokemonIndex, itemId)
    } catch (error) {
      toast.error("Failed to use Item")
      setLoadingStatus(false)
    }
  }

  const onUseItem = async (
    pokemon: any,
    item: any
  ) => {
    setLoadingStatus(false)
    const itemData = transformItemData(item)
    const pokemonData = transformPokemonData(pokemon)
    if (itemData.effect === 99999) {
      toast.success(`${pokemonData.name} has restored all its hp`)
    } else {
      toast.success(`${pokemonData.name} has increased its health to ${pokemonData.hp} hp`)
    }
  }

  useContractEvent<Item & Contract>({
    contract: itemContract,
    eventName: "UseItem",
    listener: onUseItem
  })

  useEffect(() => {
    if (itemContract) {
      getHealings()
    }
  }, [itemContract])

  return { healings, useItem, loadingStatus }
}
