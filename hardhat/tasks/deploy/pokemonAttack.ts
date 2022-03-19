import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { ethers } from "ethers";

type Ethers = typeof ethers & HardhatEthersHelpers;

export const deployPokemonAttackContract = async (ethers: Ethers, pokemonGameAddress: string) => {
  const pokemonAttackContractFactory = await ethers.getContractFactory("PokemonAttack");
  const pokemonAttackContract = await pokemonAttackContractFactory.deploy(pokemonGameAddress);

  await pokemonAttackContract.deployed();

  console.log("PokemonAttack deployed to:", pokemonAttackContract.address);

  return {
    pokemonAttackContract
  }
}
