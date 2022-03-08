// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from 'hardhat'
import { getPokemonData } from "./getPokeApiData"

async function main () {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const limit = 7
  const pokemonList = await getPokemonData(limit)

  // We get the contract to deploy
  const gameContractFactory = await ethers.getContractFactory('MyEpicGame')
  const gameContract = await gameContractFactory.deploy(
    pokemonList.characterNames,
    pokemonList.characterIndexes,
    pokemonList.characterImageURIs,
    pokemonList.characterHp,
    pokemonList.characterAttackDmg,
    "Dialga", // Boss name
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/483.png", // Boss image
    200, // Boss hp
    30, // Boss attack damage
  )

  await gameContract.deployed()
  console.log('MyEpicGame deployed to:', gameContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
