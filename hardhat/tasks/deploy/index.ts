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
    console.log("Deployment...")
    const { metallicContract } = await deployMetallicContract(hre.ethers)
    const { gameRewardsContract } = await deployGameRewardsContract(hre.ethers, metallicContract.address)
    const txGameRewards = await metallicContract.transfer(gameRewardsContract.address, hre.ethers.utils.parseEther(`${GAME_REWARDS_AMOUNT}`))
    await txGameRewards.wait()

    const { pokemonGameContract } = await deployPokemonGameContract(hre.ethers, gameRewardsContract.address)
    const { pokemonAttackContract } = await deployPokemonAttackContract(hre.ethers, pokemonGameContract.address)

    const { itemContract } = await deployItemContract(hre.ethers)
    const { itemMarketContract } = await deployItemMarketContract(hre.ethers)

    await listItemMarket({ itemContract, itemMarketContract })

    await gameRewardsContract.updatePokemonGameAddress(pokemonGameContract.address)
    await pokemonGameContract.updateItemAddress(itemContract.address)
    await pokemonAttackContract.updateItemAddress(itemContract.address)
    await itemContract.updatePokemonAttackAddress(pokemonAttackContract.address)
  }
)

