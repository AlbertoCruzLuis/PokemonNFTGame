import { expect } from 'chai'
import { Contract, Signer } from 'ethers'
import { ethers } from 'hardhat'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { deployGameRewardsContract } from '../../tasks/deploy/gameRewards'
import { GameRewards, Metallic } from '../../typechain'

const GAME_REWARDS_AMOUNT = 126_000_000 // 30% of total Supply

describe('GameRewards', function () {
  let gameRewardsContract_: GameRewards | Contract
  let metallicContract_: Metallic | Contract

  before(async function () {
    const { metallicContract } = await deployMetallicContract(ethers)
    metallicContract_ = metallicContract
    const { gameRewardsContract } = await deployGameRewardsContract(ethers, metallicContract.address)
    gameRewardsContract_ = gameRewardsContract
    await metallicContract.transfer(gameRewardsContract.address, ethers.utils.parseEther(`${GAME_REWARDS_AMOUNT}`))
  })

  it("Should show balance of Contract", async function () {
    const balance = await metallicContract_.balanceOf(gameRewardsContract_.address)
    expect(parseInt(ethers.utils.formatEther(balance))).to.equal(GAME_REWARDS_AMOUNT)
  })
})
