import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";

type Ethers = typeof ethers & HardhatEthersHelpers;

export const deployMetallicContract = async (ethers: Ethers) => {
  const metallicContractFactory = await ethers.getContractFactory("Metallic");
  const metallicContract = await metallicContractFactory.deploy();

  await metallicContract.deployed();

  console.log("Metallic deployed to:", metallicContract.address);

  return {
    metallicContract
  }
}
