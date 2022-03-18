import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { before } from 'mocha'
import { PokemonGame } from '../../typechain'
import { getPokemonData } from "../../scripts/PokeApiData/getPokemonsData"
import { pokemons } from "../../data/pokemon"
import { splitDataInChunks } from "../../utils"

describe('PokemonGame - Deploy', function () {
  let gameContract: PokemonGame
  let deployer: Signer
  let bossesIds: number[]
  let bossesLevels: number[]
  let mewtwoId = 150;

  it("Should deploy contract", async function () {
    // const limit = 150
    //const pokemonList = await getPokemonData(limit)
    const pokemonList = pokemons

    bossesIds = [mewtwoId]
    bossesLevels = [10]

    // We get the contract to deploy
    const gameContractFactory = await ethers.getContractFactory('PokemonGame')
    deployer = gameContractFactory.signer
    gameContract = await gameContractFactory.deploy()

    await gameContract.deployed()
    console.log('Pokemon deployed to:', gameContract.address)

    const amountChunks = 5

    const characterIndexes = splitDataInChunks(pokemons.characterIndexes, amountChunks)
    const characterNames = splitDataInChunks(pokemons.characterNames, amountChunks)
    const characterImageURIs = splitDataInChunks(pokemons.characterImageURIs, amountChunks)
    const characterHp = splitDataInChunks(pokemons.characterHp, amountChunks)
    const characterAttack = splitDataInChunks(pokemons.characterAttack, amountChunks)

    for (let i = 0; i < characterIndexes.length; i++) {
      await gameContract.createPokemonsData(
        characterIndexes[i],
        characterNames[i],
        characterImageURIs[i],
        characterHp[i],
        characterAttack[i]
      )
    }

    await gameContract.createBossesData(
      bossesIds,
      bossesLevels
    )
  }).timeout(6000000)
})
