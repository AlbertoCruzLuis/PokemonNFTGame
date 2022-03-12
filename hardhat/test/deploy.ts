import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { before } from 'mocha'
import { PokemonGame } from '../typechain'
import { getPokemonData } from "../scripts/getPokeApiData"
import { pokemons } from "../data/pokemon"

describe('PokemonGame - Deploy', function () {
  let gameContract: PokemonGame
  let deployer: Signer
  let bossId: number
  let bossLevel: number

  it("Should deploy contract", async function () {
    const limit = 150
    //const pokemonList = await getPokemonData(limit)
    const pokemonList = pokemons

    bossId = 150
    bossLevel = 10

    // We get the contract to deploy
    const gameContractFactory = await ethers.getContractFactory('PokemonGame')
    deployer = gameContractFactory.signer
    gameContract = await gameContractFactory.deploy(
      pokemonList.characterIndexes,
      pokemonList.characterNames,
      pokemonList.characterImageURIs,
      pokemonList.characterHp,
      pokemonList.characterAttack,
      [bossId, bossLevel]
    )

    await gameContract.deployed()
    console.log('Pokemon deployed to:', gameContract.address)
  }).timeout(6000000)
})
