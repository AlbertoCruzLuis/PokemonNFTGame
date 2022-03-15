import { expect } from 'chai'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { Item } from '../../typechain'
import { items } from "../../data/items"

describe('Item - Deploy', function () {
  let itemContract: Item
  let deployer: Signer

  it("Should deploy contract", async function () {
    const itemsList = items

    // We get the contract to deploy
    const itemContractFactory = await ethers.getContractFactory('Item')
    deployer = itemContractFactory.signer
    itemContract = await itemContractFactory.deploy(
      itemsList.itemsIndexes,
      itemsList.itemsNames,
      itemsList.itemsDescription,
      itemsList.itemsImageURIs,
      itemsList.itemsCategory,
      itemsList.itemsCost,
      itemsList.itemsEffect
    )

    await itemContract.deployed()
    console.log('Item deployed to:', itemContract.address)
  }).timeout(6000000)
})
