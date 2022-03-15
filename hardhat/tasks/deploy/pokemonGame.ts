import { task } from "hardhat/config"
import { pokemons } from "../../data/pokemon"

task("deploy:pokemonGame", "Deploy contract of Pokemon Game", async (taskArgs, hre) => {
  const pokemonList = pokemons

  // Pokemon: Mewtwo - Level: 10
  const bossesIds = [150]
  const bossesLevels = [10]

  const pokemonGameFactory = await hre.ethers.getContractFactory("PokemonGame");
  const pokemonGame = await pokemonGameFactory.deploy(
    pokemonList.characterIndexes,
    pokemonList.characterNames,
    pokemonList.characterImageURIs,
    pokemonList.characterHp,
    pokemonList.characterAttack,
    bossesIds,
    bossesLevels
  );

  await pokemonGame.deployed();

  console.log("PokemonGame deployed to:", pokemonGame.address);
});
