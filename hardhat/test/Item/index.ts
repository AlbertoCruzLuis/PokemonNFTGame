import { expect } from 'chai'
import { before, it } from 'mocha'
import { Contract, Signer } from 'ethers'
import { ethers } from 'hardhat'
import { Item } from '../../typechain'
import { items } from "../../data/items"
import { deployItemContract } from '../../tasks/deploy/item'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

describe('Item', function () {
  let itemContract: Item | Contract
  let deployer: SignerWithAddress

  before(async function () {
    const [owner] = await ethers.getSigners()
    deployer = owner
    const { itemContract: itemContract_ } = await deployItemContract(ethers)
    itemContract = itemContract_
  })

  it("Should get All Items", async function () {
    const listItemsRaw = await itemContract.getAllItems()
    const listItems = listItemsRaw.map((item: any) => {
      return item.info.id.toNumber()
    })
    expect(listItems).to.eql(items.itemsIndexes)
  })

  it("Should get items of Deployer", async function () {
    const itemsRaw = await itemContract.getItemsOf(deployer.address)
    itemsRaw.map((item: any) => {
      expect(item.amount.toNumber()).to.equal(100)
    })
  })

  it("Should get items of User Wallet", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const itemsRaw = await itemContract.getItemsOf(addr1.address)
    itemsRaw.map((item: any) => {
      expect(item.amount.toNumber()).to.equal(0)
    })
  })

  it("Should get Total Items", async function () {
    const totalItems = await itemContract.getTotalItems()
    expect(totalItems.toNumber()).to.equal(items.itemsIndexes.length)
  })

  it("Should mint an item", async function () {
    const itemId = items.itemsIndexes[0]
    console.log(itemId);
    const amount = 2
    await itemContract.mint(deployer.address, itemId, amount);
  })

  it("Should get effect of item", async function () {
    const listItemsRaw = await itemContract.getAllItems()
    const listItems = listItemsRaw.map((item: any) => {
      return item.info.effect.toNumber()
    })
    expect(listItems).to.eql(items.itemsEffect)
  })
})
