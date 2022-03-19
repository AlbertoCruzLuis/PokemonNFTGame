import { expect } from 'chai'
import { before } from 'mocha'
import { Contract, Signer } from 'ethers'
import { ethers } from 'hardhat'
import { Item } from '../../typechain'
import { items } from "../../data/items"
import { PokemonGame } from '../../typechain'
import { deployPokemonGameContract } from '../../tasks/deploy/pokemonGame'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { deployGameRewardsContract } from '../../tasks/deploy/gameRewards'
import { deployPokemonAttackContract } from '../../tasks/deploy/pokemonAttack'
import { deployItemContract } from '../../tasks/deploy/item'

const GAME_REWARDS_AMOUNT = 126_000_000 // 30% of total Supply

describe('Integration', function () {
  let itemContract: Item
  let gameContract: PokemonGame | Contract
  let deployer: Signer
  let pokemomSelected = 0;
  let mewtwoId = 150;

  it("Should use Item with an pokemon", async function () {
    const { metallicContract } = await deployMetallicContract(ethers)
    const { gameRewardsContract } = await deployGameRewardsContract(ethers, metallicContract.address)
    await metallicContract.transfer(gameRewardsContract.address, ethers.utils.parseEther(`${GAME_REWARDS_AMOUNT}`))

    const { itemContract } = await deployItemContract(ethers)

    const { pokemonGameContract } = await deployPokemonGameContract(ethers, gameRewardsContract.address)
    pokemonGameContract.updateItemAddress(itemContract.address)
    gameContract = pokemonGameContract
    gameRewardsContract.updatePokemonGameAddress(pokemonGameContract.address)

    const { pokemonAttackContract } = await deployPokemonAttackContract(ethers, pokemonGameContract.address)

    let deployerAddress = await pokemonGameContract.signer.getAddress()

    const pokemonId = 4
    await gameContract.mint(pokemonId)

    await pokemonAttackContract.attackBoss(pokemomSelected, mewtwoId)


    console.log("Before useItem");
    console.log("hp: ", (await gameContract.getPokemonSelected(deployerAddress, 0)).stats.hp);

    itemContract.useItem(gameContract.address,0,17)

    console.log("After useItem");
    console.log("hp: ", (await gameContract.getPokemonSelected(deployerAddress, 0)).stats.hp);

    itemContract.useItem(gameContract.address,0,23)
    console.log("hp: ", (await gameContract.getPokemonSelected(deployerAddress, 0)).stats.hp);
  })
})
