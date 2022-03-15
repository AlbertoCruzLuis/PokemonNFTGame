import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";
import { items } from "../../data/items"

type Ethers = typeof ethers & HardhatEthersHelpers;

export const deployItemContract = async (ethers: Ethers) => {
  const itemsList = items

  const itemContractFactory = await ethers.getContractFactory("Item");
  const itemContract = await itemContractFactory.deploy(
    itemsList.itemsIndexes,
    itemsList.itemsNames,
    itemsList.itemsDescription,
    itemsList.itemsImageURIs,
    itemsList.itemsCategory,
    itemsList.itemsCost,
    itemsList.itemsEffect
  );

  await itemContract.deployed();

  console.log("Item deployed to:", itemContract.address);

  return {
    itemContract
  }
}
