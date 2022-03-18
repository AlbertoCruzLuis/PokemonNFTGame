import { expect } from 'chai'
import { before } from 'mocha'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { Item } from '../../typechain'
import { items } from "../../data/items"
import { PokemonGame } from '../../typechain'
import { pokemons } from "../../data/pokemon"
import { splitDataInChunks } from '../../utils'

describe('Integration', function () {
  let itemContract: Item
  let gameContract: PokemonGame
  let deployer: Signer
  let bossesIds: number[]
  let bossesLevels: number[]
  let pokemomSelected = 0;
  let mewtwoId = 150;

  it("Should use Item with an pokemon", async function () {
    const pokemonList = pokemons

    bossesIds = [mewtwoId]
    bossesLevels = [10]

    const gameContractFactory = await ethers.getContractFactory('PokemonGame')
    deployer = gameContractFactory.signer
    gameContract = await gameContractFactory.deploy()

    const deployerAddress = await deployer.getAddress()

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

    const pokemonId = 4
    await gameContract.mint(pokemonId)

    await gameContract.attackBoss(pokemomSelected, mewtwoId)

    const itemsList = items

    // --- Deploy itemContract ---
    const itemContractFactory = await ethers.getContractFactory('Item')
    deployer = itemContractFactory.signer
    itemContract = await itemContractFactory.deploy(
      itemsList.itemsIndexes,
      itemsList.itemsNames,
      itemsList.itemsDescription,
      itemsList.itemsImageURIs,
      itemsList.itemsCategory,
      itemsList.itemsCost,
      itemsList.itemsEffect
    )

    await itemContract.deployed()
    console.log('Item deployed to:', itemContract.address)

    console.log("Before useItem");
    console.log("hp: ", (await gameContract.getPokemonSelected(deployerAddress, 0)).stats.hp);

    itemContract.useItem(gameContract.address,0,17)

    console.log("After useItem");
    console.log("hp: ", (await gameContract.getPokemonSelected(deployerAddress, 0)).stats.hp);

    itemContract.useItem(gameContract.address,0,23)
    console.log("hp: ", (await gameContract.getPokemonSelected(deployerAddress, 0)).stats.hp);
  })
})
