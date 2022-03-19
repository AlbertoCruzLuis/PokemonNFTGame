import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";

type Ethers = typeof ethers & HardhatEthersHelpers;

export const deployGameRewardsContract = async (ethers: Ethers, tokenAddress: string) => {
  const gameRewardsContractFactory = await ethers.getContractFactory("GameRewards");
  const gameRewardsContract = await gameRewardsContractFactory.deploy(tokenAddress);

  await gameRewardsContract.deployed();

  console.log("GameRewards deployed to:", gameRewardsContract.address);

  return {
    gameRewardsContract
  }
}
