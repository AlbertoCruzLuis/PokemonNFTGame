import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { before } from 'mocha'
import { isValidateOpenseaMetadata } from '../../scripts/getValidateOpenseaMetadata'
import { PokemonGame } from '../../typechain'
import { pokemons } from "../../data/pokemon"
import { splitDataInChunks } from "../../utils"

describe('PokemonGame', function () {
  let gameContract: PokemonGame
  let deployer: Signer
  let bossesIds: number[]
  let bossesLevels: number[]
  let mewtwoId = 150
  before(async function () {
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
  })

  it("Should return that don't has token minted", async function () {
    const nft = await gameContract.hasNft()
    expect(nft.info.id).to.equal(0)
  })

  it("Should return metadata of token", async function () {
    const pokemonId = 2
    await gameContract.mint(pokemonId)

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

  it("Should return that has token minted", async function () {
    const pokemonId = 3
    await gameContract.mint(pokemonId)

    const nft = await gameContract.hasNft()
    expect(nft.info.id).to.not.equal(0)
  })

  it("Should return pokemons of user", async function () {
    const addressDeployer = await deployer.getAddress()

    const pokemons = await gameContract.getPokemonsOf(addressDeployer)
    expect(pokemons[0].info.name).to.equal("ivysaur")
  })

  it("Should return total experience of boss", async function () {
    const bossRaw = await gameContract.getBoss(mewtwoId)
    const boss = await gameContract.getPokemonReadable(bossRaw)
    expect(boss.totalExperience).to.equal(392)
  })

  it("Should return All Pokemons", async function () {
    const pokemonsRaw = await gameContract.getAllPokemons()
    const pokemons = await Promise.all(pokemonsRaw.map(async (pokemonRaw) => await gameContract.getPokemonReadable(pokemonRaw)))

    pokemons.map((data, index) => {
      expect(data.info.id).to.equal(index + 1)
    })
  })
})
