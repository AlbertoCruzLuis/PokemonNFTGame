import { HardhatEthersHelpers } from "@nomiclabs/hardhat-ethers/types";
import { Contract, ethers } from "ethers";
import { splitDataInChunks } from "../../utils";
import { pokemons } from "../../data/pokemon"
import { PokemonGame } from "../../typechain";

type Ethers = typeof ethers & HardhatEthersHelpers;

interface IdeployPokemonGameContract {
  pokemonGameContract: PokemonGame | Contract
}

export const deployPokemonGameContract = async (ethers: Ethers, gameRewardsAddress: string): Promise<IdeployPokemonGameContract> => {
  // Pokemon: Mewtwo - Level: 40
  const bossesIds = [65, 91, 106, 150]
  const bossesLevels = [10, 20, 30, 40]

  const pokemonGameFactory = await ethers.getContractFactory("PokemonGame");
  const pokemonGameContract: PokemonGame | Contract = await pokemonGameFactory.deploy(gameRewardsAddress);

  await pokemonGameContract.deployed();
  console.log("PokemonGame deployed to:", pokemonGameContract.address);

  const amountChunks = 20
  const characterIndexes = splitDataInChunks(pokemons.characterIndexes, amountChunks)
  const characterNames = splitDataInChunks(pokemons.characterNames, amountChunks)
  const characterImageURIs = splitDataInChunks(pokemons.characterImageURIs, amountChunks)
  const characterHp = splitDataInChunks(pokemons.characterHp, amountChunks)
  const characterAttack = splitDataInChunks(pokemons.characterAttack, amountChunks)

  for (let i = 0; i < characterIndexes.length; i++) {
    console.log("PokemonData: ", i);
    const tx = await pokemonGameContract.createPokemonsData(
      characterIndexes[i],
      characterNames[i],
      characterImageURIs[i],
      characterHp[i],
      characterAttack[i],
    )
    console.log(tx.gasLimit);
  }

  console.log("BossesData");
  await pokemonGameContract.createBossesData(
    bossesIds,
    bossesLevels,
  )

  return {
    pokemonGameContract
  }
}

