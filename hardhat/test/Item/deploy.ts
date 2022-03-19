import { expect } from 'chai'
import { ethers } from 'hardhat'
import { deployItemContract } from '../../tasks/deploy/item'

describe('Item - Deploy', function () {
  it("Should deploy contract", async function () {
    await deployItemContract(ethers)
  }).timeout(6000000)
})
