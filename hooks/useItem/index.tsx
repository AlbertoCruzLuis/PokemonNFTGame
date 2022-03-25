import { transformItemData } from "lib/getNftMetadata"

import { ITEM_ADDRESS } from "config"
import ItemContract from "hardhat/artifacts/contracts/Item/Item.sol/Item.json"
import { useContract } from "hooks/useContract"
import { Contract } from "ethers"
import { useQuery } from "react-query"

interface useItemProps {
  id: number
}

export const useItem = ({ id }: useItemProps) => {
  const { contract: itemContract } = useContract<Contract>({
    contractAddress: ITEM_ADDRESS,
    contractJson: ItemContract
  })

  const getItem = async (_id: number) => {
    if (!itemContract) return

    const itemRaw = await itemContract.getItem(_id)
    const itemRawReadable = await itemContract.getItemReadable(itemRaw)

    return transformItemData(itemRawReadable)
  }

  const { data: item } = useQuery(["item", id], () => getItem(id), { enabled: !!itemContract })

  return { item }
}
