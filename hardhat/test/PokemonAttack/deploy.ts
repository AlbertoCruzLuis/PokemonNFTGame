import { expect } from 'chai'
import { ethers } from 'hardhat'
import { deployPokemonGameContract } from '../../tasks/deploy/pokemonGame'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { deployGameRewardsContract } from '../../tasks/deploy/gameRewards'
import { deployPokemonAttackContract } from '../../tasks/deploy/pokemonAttack'

describe('PokemonAttack - Deploy', function () {
  it("Should deploy contract", async function () {
    const { metallicContract } = await deployMetallicContract(ethers)
    const { gameRewardsContract } = await deployGameRewardsContract(ethers, metallicContract.address)
    const { pokemonGameContract } = await deployPokemonGameContract(ethers, gameRewardsContract.address)

    await deployPokemonAttackContract(ethers, pokemonGameContract.address)
  }).timeout(6000000)
})
