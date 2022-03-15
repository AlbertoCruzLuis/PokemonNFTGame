import { useEffect, useState } from "react"
import { IItemData, transformItemData } from "lib/getNftMetadata"

import { ITEM_ADDRESS, ITEM_MARKET_ADDRESS } from "config"
import ItemContract from "hardhat/artifacts/contracts/Item.sol/Item.json"
import { Item } from "hardhat/typechain/Item"
import ItemMarketContract from "hardhat/artifacts/contracts/ItemMarket.sol/ItemMarket.json"
import { ItemMarket } from "hardhat/typechain/ItemMarket"
import { useContract } from "hooks/useContract"
import { Contract, ethers } from "ethers"
import { useContractEvent } from "hooks/useContractEvent"
import toast from "react-hot-toast"

export interface IbuyItem {
  itemId: number,
  amount: number,
  costItem: number
}

export const useItemMarket = () => {
  const { contract: itemContract } = useContract<Item>({
    contractAddress: ITEM_ADDRESS,
    contractJson: ItemContract
  })
  const { contract: itemMarketContract } = useContract<ItemMarket>({
    contractAddress: ITEM_MARKET_ADDRESS,
    contractJson: ItemMarketContract
  })
  const [items, setItems] = useState<IItemData[]>()

  const getItems = async () => {
    try {
      if (!itemContract || !itemMarketContract) return

      const itemListRaw = await itemMarketContract.getAllItems()

      const healingListRaw = await Promise.all(itemListRaw.map(async (item: any) => {
        const itemRaw = await itemContract.getItemNft(item.id.toNumber())
        return await itemContract.getItemReadable(itemRaw)
      }))

      const itemList = healingListRaw.map((itemData: any) =>
        transformItemData(itemData)
      )

      setItems(itemList)
    } catch (error) {
      console.error("Something went wrong fetching characters:", error)
    }
  }

  const buyItem = async ({ itemId, amount, costItem }: IbuyItem) => {
    const priceItem = ethers.utils.parseUnits(String(costItem), "ether")
    if (!itemContract || !itemMarketContract) return
    await itemMarketContract.buyItem(itemContract.address, itemId, amount, { value: priceItem })
  }

  const onBuyItem = (
    buyer: string,
    seller: string,
    tokenAddress: string,
    id: number,
    amount: number,
    price: number
  ) => {
    console.log(buyer, seller, tokenAddress, id, amount, price)
    toast.success(`You are Buy ${amount} items`)
  }

  useContractEvent<ItemMarket & Contract>({
    contract: itemMarketContract,
    eventName: "BuyItem",
    listener: onBuyItem
  })

  useEffect(() => {
    if (itemContract) {
      getItems()
    }
  }, [itemContract])

  return { items, buyItem }
}
