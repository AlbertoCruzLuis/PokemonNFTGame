import { task } from "hardhat/config"
import { splitDataInChunks } from "../../utils";
import { pokemons } from "../../data/pokemon"

task("deploy:pokemonGame", "Deploy contract of Pokemon Game", async (taskArgs, hre) => {
  // Pokemon: Mewtwo - Level: 10
  const bossesIds = [150]
  const bossesLevels = [10]

  const pokemonGameFactory = await hre.ethers.getContractFactory("PokemonGame");
  const pokemonGame = await pokemonGameFactory.deploy();

  await pokemonGame.deployed();
  console.log("PokemonGame deployed to:", pokemonGame.address);

  const amountChunks = 5
  const characterIndexes = splitDataInChunks(pokemons.characterIndexes, amountChunks)
  const characterNames = splitDataInChunks(pokemons.characterNames, amountChunks)
  const characterImageURIs = splitDataInChunks(pokemons.characterImageURIs, amountChunks)
  const characterHp = splitDataInChunks(pokemons.characterHp, amountChunks)
  const characterAttack = splitDataInChunks(pokemons.characterAttack, amountChunks)

  for (let i = 0; i < characterIndexes.length; i++) {
    await pokemonGame.createPokemonsData(
      characterIndexes[i],
      characterNames[i],
      characterImageURIs[i],
      characterHp[i],
      characterAttack[i]
    )
  }

  await pokemonGame.createBossesData(
    bossesIds,
    bossesLevels
  )
});
