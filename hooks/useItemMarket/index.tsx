import { useEffect, useState } from "react"
import { IItemData, transformItemData } from "lib/getNftMetadata"

import { ITEM_ADDRESS, ITEM_MARKET_ADDRESS, METALLIC_ADDRESS } from "config"
import ItemContract from "hardhat/artifacts/contracts/Item/Item.sol/Item.json"
import { Item } from "hardhat/typechain/Item"
import ItemMarketContract from "hardhat/artifacts/contracts/ItemMarket.sol/ItemMarket.json"
import { ItemMarket } from "hardhat/typechain/ItemMarket"
import MetallicContract from "hardhat/artifacts/contracts/Metallic.sol/Metallic.json"
import { Metallic } from "hardhat/typechain/Metallic"
import { useContract } from "hooks/useContract"
import { Contract, ethers } from "ethers"
import { useContractEvent } from "hooks/useContractEvent"
import toast from "react-hot-toast"
import { useWeb3 } from "@3rdweb/hooks"
import { useQuery } from "react-query"

export interface IbuyItem {
  itemId: number,
  amount: number,
  costItem: number
}

export const useItemMarket = () => {
  const { address } = useWeb3()
  const { contract: itemContract } = useContract<Item & Contract>({
    contractAddress: ITEM_ADDRESS,
    contractJson: ItemContract
  })
  const { contract: itemMarketContract } = useContract<ItemMarket & Contract>({
    contractAddress: ITEM_MARKET_ADDRESS,
    contractJson: ItemMarketContract
  })

  const { contract: metallicContract } = useContract<Metallic & Contract>({
    contractAddress: METALLIC_ADDRESS,
    contractJson: MetallicContract
  })
  const [isBuying, setBuying] = useState(false)

  const getItems = async () => {
    try {
      if (!itemContract || !itemMarketContract) return []

      const itemListRaw = await itemMarketContract.getAllItems()

      const healingListRaw = await Promise.all(itemListRaw.map(async (item: any) => {
        const itemRaw = await itemContract.getItemNft(item.id.toNumber())
        return await itemContract.getItemReadable(itemRaw)
      }))

      const itemList = healingListRaw.map((itemData: any) =>
        transformItemData(itemData)
      )

      return itemList
    } catch (error) {
      console.error("Something went wrong fetching characters:", error)
    }
  }

  const { data: items } = useQuery(["items"], getItems, { enabled: !!(itemContract && itemMarketContract) })

  const buyItem = async ({ itemId, amount, costItem }: IbuyItem) => {
    try {
      const priceItem = ethers.utils.parseUnits(String(costItem), "ether")
      if (!itemContract || !itemMarketContract || !metallicContract) return

      const balance = await metallicContract.balanceOf(address)
      const balanceInt = parseInt(ethers.utils.formatEther(balance))
      const priceItemInt = parseInt(ethers.utils.formatEther(priceItem))
      if (balanceInt < priceItemInt) {
        toast.error("You don't have money for buy this item")
        return
      }
      setBuying(true)
      await metallicContract.approve(itemMarketContract.address, priceItem)
      await itemMarketContract.buyItem(METALLIC_ADDRESS, itemContract.address, itemId, amount)
    } catch (error) {
      setBuying(false)
      toast.error("Failed to Buy an Item")
    }
  }

  const onBuyItem = (
    buyer: string,
    seller: string,
    tokenAddress: string,
    id: number,
    amount: number,
    price: number
  ) => {
    if (buyer !== address) return

    console.log(buyer, seller, tokenAddress, id, amount, price)
    setBuying(false)
    toast.success(`You are Buy ${amount} items`)
  }

  useContractEvent<Contract>({
    contract: itemMarketContract,
    eventName: "BuyItem",
    listener: onBuyItem
  })

  useEffect(() => {
    if (itemContract) {
      getItems()
    }
  }, [itemContract])

  return { items, buyItem, isBuying }
}
