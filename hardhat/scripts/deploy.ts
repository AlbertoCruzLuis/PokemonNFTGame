// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat'
import { getPokemonData } from "./getPokeApiData"
import { pokemons } from "../data/pokemon"

async function main () {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const limit = 150
  // const pokemonList = await getPokemonData(limit)
  const pokemonList = pokemons

  // Pokemon: Mewtwo - Level: 10
  const [bossId, bossLevel] = [150, 10]

  // We get the contract to deploy
  const gameContractFactory = await ethers.getContractFactory('PokemonGame')
  const gameContract = await gameContractFactory.deploy(
    pokemonList.characterIndexes,
    pokemonList.characterNames,
    pokemonList.characterImageURIs,
    pokemonList.characterHp,
    pokemonList.characterAttack,
    [bossId, bossLevel]
  )

  await gameContract.deployed()
  console.log('PokemonGame deployed to:', gameContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
