import { task } from "hardhat/config"
import { deployItemContract } from "./item"
import { deployItemMarketContract } from "./itemMarket"
import { listItemMarket } from "../listItemsMarket"
import { deployMetallicContract } from "./metallic"
import { deployGameRewardsContract } from "./gameRewards"
import { deployPokemonGameContract } from "./pokemonGame"
import { deployPokemonAttackContract } from "./pokemonAttack"

const GAME_REWARDS_AMOUNT = 126_000_000 // 30% of total Supply

task("deploy", "Deploy all contracts").setAction(
  async (taskArgs, hre) => {
    const { metallicContract } = await deployMetallicContract(hre.ethers)
    const { gameRewardsContract } = await deployGameRewardsContract(hre.ethers, metallicContract.address)
    await metallicContract.transfer(gameRewardsContract.address, hre.ethers.utils.parseEther(`${GAME_REWARDS_AMOUNT}`))

    const { pokemonGameContract } = await deployPokemonGameContract(hre.ethers, gameRewardsContract.address)
    await deployPokemonAttackContract(hre.ethers, pokemonGameContract.address)
    gameRewardsContract.updatePokemonGameAddress(pokemonGameContract.address)

    const { itemContract } = await deployItemContract(hre.ethers)
    const { itemMarketContract } = await deployItemMarketContract(hre.ethers)

    pokemonGameContract.updateItemAddress(itemContract.address)
    await listItemMarket({ itemContract, itemMarketContract })
  }
)

