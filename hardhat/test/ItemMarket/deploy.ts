import { expect } from 'chai'
import { ethers } from 'hardhat'
import { deployItemMarketContract } from '../../tasks/deploy/itemMarket'

describe('ItemMarket - Deploy', function () {
  it("Should deploy contract", async function () {
    await deployItemMarketContract(ethers)
  })
})
