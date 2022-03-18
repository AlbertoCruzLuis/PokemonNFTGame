import { items } from "../data/items"
import { Contract } from "ethers";

interface IListItemMarket {
  itemContract: Contract,
  itemMarketContract: Contract
}

export const listItemMarket = async ({itemMarketContract, itemContract}: IListItemMarket) => {
  for (let index = 0; index < items.itemsIndexes.length; index++) {
    const itemId = items.itemsIndexes[index]
    const itemCost = items.itemsCost[index]
    await itemContract.setApprovalForAll(itemMarketContract.address, true);
    await itemMarketContract.listItem(itemContract.address, itemId, 100, itemCost)
  }
}


