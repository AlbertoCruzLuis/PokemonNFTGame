import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { Metallic } from '../../typechain'

describe('Metallic - Deploy', function () {
  let metallicContract: Metallic
  let deployer: Signer

  it("Should deploy contract", async function () {
    // We get the contract to deploy
    const metallicContractFactory = await ethers.getContractFactory('Metallic')
    deployer = metallicContractFactory.signer
    metallicContract = await metallicContractFactory.deploy()

    await metallicContract.deployed()
    console.log('Metallic deployed to:', metallicContract.address)
  })
})
