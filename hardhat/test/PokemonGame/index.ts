import { expect } from 'chai'
import { Contract, Signer } from 'ethers'
import { ethers } from 'hardhat'
import { before } from 'mocha'
import { PokemonGame } from '../../typechain'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { deployGameRewardsContract } from '../../tasks/deploy/gameRewards'
import { deployPokemonGameContract } from '../../tasks/deploy/pokemonGame'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

const GAME_REWARDS_AMOUNT = 126_000_000 // 30% of total Supply

describe('PokemonGame', function () {
  let gameContract: PokemonGame | Contract
  let deployer: SignerWithAddress
  let mewtwoId = 150
  before(async function () {
    const [owner] = await ethers.getSigners()
    deployer = owner

    const { metallicContract } = await deployMetallicContract(ethers)
    const { gameRewardsContract } = await deployGameRewardsContract(ethers, metallicContract.address)
    await metallicContract.transfer(gameRewardsContract.address, ethers.utils.parseEther(`${GAME_REWARDS_AMOUNT}`))


    const { pokemonGameContract } = await deployPokemonGameContract(ethers, gameRewardsContract.address)
    gameContract = pokemonGameContract
    gameRewardsContract.updatePokemonGameAddress(pokemonGameContract.address)
  })

  it("Should return that don't has token minted", async function () {
    const nft = await gameContract.hasNft()
    expect(nft.info.id).to.equal(0)
  })

  it("Should return that has token minted", async function () {
    const pokemonId = 2
    await gameContract.mint(pokemonId)

    const nft = await gameContract.hasNft()
    expect(nft.info.id).to.not.equal(0)
  })

  it("Should return metadata of token", async function () {
    const tokenId = 1
    const encodedAppJson = await gameContract.tokenURI(tokenId)
    const encodedMetadata = encodedAppJson.replace("data:application/json;base64,", "")

    const decodedMetadata = Buffer.from(encodedMetadata, "base64").toString()
    const metadataRegex = new RegExp('{"name".*"description".*"image".*"attributes".*}')
    expect(metadataRegex.test(decodedMetadata)).to.equal(true);
  })

  it("Should return total of pokemons", async function () {
    const totalPokemons = await gameContract.getTotalPokemons()
    expect(totalPokemons).to.equal(150)
  })

  it("Should return pokemons of user", async function () {
    const pokemons = await gameContract.getPokemonsOf(deployer.address)
    expect(pokemons[0].info.name).to.equal("ivysaur")
  })

  it("Should return total experience of boss", async function () {
    const bossRaw = await gameContract.getBoss(mewtwoId)
    const boss = await gameContract.getPokemonReadable(bossRaw)
    expect(boss.totalExperience).to.equal(392)
  })

  it("Should return All Pokemons", async function () {
    const pokemonsRaw = await gameContract.getAllPokemons()
    const pokemons = await Promise.all(pokemonsRaw.map(async (pokemonRaw: any) => await gameContract.getPokemonReadable(pokemonRaw)))

    pokemons.map((data, index) => {
      expect(data.info.id).to.equal(index + 1)
    })
  })
})
