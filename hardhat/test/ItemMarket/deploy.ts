import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { ItemMarket } from '../../typechain'

describe('ItemMarket - Deploy', function () {
  let itemMarketContract: ItemMarket
  let deployer: Signer

  it("Should deploy contract", async function () {
    const itemMarketContractFactory = await ethers.getContractFactory('ItemMarket')
    deployer = itemMarketContractFactory.signer
    itemMarketContract = await itemMarketContractFactory.deploy()

    await itemMarketContract.deployed()
    console.log('ItemMarket deployed to:', itemMarketContract.address)
  })
})
