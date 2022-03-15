import { expect } from 'chai'
import { before, it } from 'mocha'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { Item } from '../../typechain'
import { items } from "../../data/items"

describe('Item', function () {
  let itemContract: Item
  let deployer: Signer

  before(async function () {
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
  })

  it("Should get All Items", async function () {
    const listItemsRaw = await itemContract.getAllItems()
    const listItems = listItemsRaw.map(item => {
      return item.info.id.toNumber()
    })
    expect(listItems).to.eql(items.itemsIndexes)
  })

  it("Should get items of Deployer", async function () {
    const deployerAddress = await deployer.getAddress()
    const itemsRaw = await itemContract.getItemsOf(deployerAddress)
    itemsRaw.map(item => {
      expect(item.amount.toNumber()).to.equal(100)
    })
  })

  it("Should get items of User Wallet", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const itemsRaw = await itemContract.getItemsOf(addr1.address)
    itemsRaw.map(item => {
      expect(item.amount.toNumber()).to.equal(0)
    })
  })

  it("Should get Total Items", async function () {
    const totalItems = await itemContract.getTotalItems()
    expect(totalItems.toNumber()).to.equal(items.itemsIndexes.length)
  })

  it("Should mint an item", async function () {
    const deployerAddress = await deployer.getAddress()
    const itemId = items.itemsIndexes[0]
    console.log(itemId);
    const amount = 2
    await itemContract.mint(deployerAddress, itemId, amount);
  })

  it("Should get effect of item", async function () {
    const listItemsRaw = await itemContract.getAllItems()
    const listItems = listItemsRaw.map(item => {
      return item.info.effect.toNumber()
    })
    expect(listItems).to.eql(items.itemsEffect)
  })
})
