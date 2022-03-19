import { expect } from 'chai'
import { Contract, Signer } from 'ethers'
import { ethers } from 'hardhat'
import { before } from 'mocha'
import { PokemonGame } from '../../typechain'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { deployGameRewardsContract } from '../../tasks/deploy/gameRewards'
import { deployPokemonGameContract } from '../../tasks/deploy/pokemonGame'
import { deployPokemonAttackContract } from '../../tasks/deploy/pokemonAttack'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

const GAME_REWARDS_AMOUNT = 126_000_000 // 30% of total Supply

describe('PokemonAttack', function () {
  let gameContract: PokemonGame | Contract
  let deployer: SignerWithAddress
  let pokemomSelected = 0;
  let mewtwoId = 150;
  before(async function () {
    const [owner] = await ethers.getSigners()
    deployer = owner

    const { metallicContract } = await deployMetallicContract(ethers)
    const { gameRewardsContract } = await deployGameRewardsContract(ethers, metallicContract.address)
    await metallicContract.transfer(gameRewardsContract.address, ethers.utils.parseEther(`${GAME_REWARDS_AMOUNT}`))

    const { pokemonGameContract } = await deployPokemonGameContract(ethers, gameRewardsContract.address)
    gameContract = pokemonGameContract
    gameRewardsContract.updatePokemonGameAddress(pokemonGameContract.address)

    const { pokemonAttackContract } = await deployPokemonAttackContract(ethers, pokemonGameContract.address)

    const pokemonId = 4
    await gameContract.mint(pokemonId)

    await pokemonAttackContract.attackBoss(pokemomSelected, mewtwoId)
  })

  it("Should sub health to boss", async function () {

    const bossRaw = await gameContract.getBoss(mewtwoId)
    const boss = await gameContract.getPokemonReadable(bossRaw)

    const player = await gameContract.getPokemonSelected(deployer.address, pokemomSelected)

    expect(boss.stats.hp.toNumber()).to.lessThan(boss.stats.maxHp.toNumber());
  })

  it("Should up level of pokemon", async function () {
    const pokemonRaw = await gameContract.getPokemonByIndexOf(pokemomSelected, deployer.address)
    const pokemon = await gameContract.getPokemonReadable(pokemonRaw)
    console.log(pokemon.info.id, pokemon.info.name);
    expect(pokemon.level.toNumber()).to.equal(5);
  })
})
