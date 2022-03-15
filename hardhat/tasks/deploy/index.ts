import { task } from "hardhat/config"
import "./metallic"
import "./pokemonGame"
import { deployItemContract } from "./item"
import { deployItemMarketContract } from "./itemMarket"
import { listItemMarket } from "../listItemsMarket"


task("deploy", "Deploy all contracts").setAction(
  async (taskArgs, hre) => {
    await hre.run("deploy:pokemonGame")
    await hre.run("deploy:metallic")
    const { itemContract } = await deployItemContract(hre.ethers)
    const { itemMarketContract } = await deployItemMarketContract(hre.ethers)
    await listItemMarket({ itemContract, itemMarketContract })
  }
)

