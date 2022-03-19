import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { Metallic } from '../../typechain'

describe('Metallic - Deploy', function () {
  it("Should deploy contract", async function () {
    await deployMetallicContract(ethers)
  })
})
