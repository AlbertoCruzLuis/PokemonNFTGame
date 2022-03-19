import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";
import { splitDataInChunks } from "../../utils";
import { items } from "../../data/items"

type Ethers = typeof ethers & HardhatEthersHelpers;

export const deployItemContract = async (ethers: Ethers) => {
  const itemContractFactory = await ethers.getContractFactory("Item");
  const itemContract = await itemContractFactory.deploy();

  await itemContract.deployed();

  console.log("Item deployed to:", itemContract.address);

  const amountChunks = 4
  const itemsIndexes = splitDataInChunks(items.itemsIndexes, amountChunks)
  const itemsNames = splitDataInChunks(items.itemsNames, amountChunks)
  const itemsDescription = splitDataInChunks(items.itemsDescription, amountChunks)
  const itemsImageURIs = splitDataInChunks(items.itemsImageURIs, amountChunks)
  const itemsCategory = splitDataInChunks(items.itemsCategory, amountChunks)
  const itemsCost = splitDataInChunks(items.itemsCost, amountChunks)
  const itemsEffect = splitDataInChunks(items.itemsEffect, amountChunks)

  for (let i = 0; i < itemsIndexes.length; i++) {
    console.log("ItemData: ", i);
    const tx = await itemContract.createItemsData(
      itemsIndexes[i],
      itemsNames[i],
      itemsDescription[i],
      itemsImageURIs[i],
      itemsCategory[i],
      itemsCost[i],
      itemsEffect[i],
    )
    console.log(tx.gasLimit);
  }

  return {
    itemContract
  }
}
