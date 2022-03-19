import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { deployGameRewardsContract } from '../../tasks/deploy/gameRewards'

describe('GameRewards - Deploy', function () {
  it("Should deploy contract", async function () {
    const { metallicContract } = await deployMetallicContract(ethers)
    await deployGameRewardsContract(ethers, metallicContract.address)
  })
})
