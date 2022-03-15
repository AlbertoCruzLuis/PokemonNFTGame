import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";

type Ethers = typeof ethers & HardhatEthersHelpers;

export const deployItemMarketContract = async (ethers: Ethers) => {
  const itemMarketContractFactory = await ethers.getContractFactory("ItemMarket");
  const itemMarketContract = await itemMarketContractFactory.deploy();

  await itemMarketContract.deployed();

  console.log("ItemMarket deployed to:", itemMarketContract.address);
  return {
    itemMarketContract
  }
}
