import { expect } from 'chai'
import { before } from 'mocha'
import { Contract, Signer } from 'ethers'
import { ethers } from 'hardhat'
import { Metallic, ItemMarket, Item } from '../../typechain'
import { items } from "../../data/items"
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { deployMetallicContract } from '../../tasks/deploy/metallic'
import { deployItemMarketContract } from '../../tasks/deploy/itemMarket'
import { deployItemContract } from '../../tasks/deploy/item'
import { listItemMarket } from '../../tasks/listItemsMarket'

describe('ItemMarket', function () {
  let metallicContract: Metallic | Contract
  let itemMarketContract: ItemMarket | Contract
  let itemContract: Item | Contract
  let owner: SignerWithAddress
  let userOne: SignerWithAddress

  before(async function () {
    const [ownerAddr, addr1] = await ethers.getSigners();
    owner = ownerAddr
    userOne = addr1

    // --- Deploy Metallic ----
    const { metallicContract: metallicContract_ } = await deployMetallicContract(ethers)
    metallicContract = metallicContract_

    const metallicAmount = ethers.utils.parseUnits("200000", 'ether')
    await metallicContract.transfer(addr1.address, metallicAmount);
    console.log(await metallicContract.balanceOf(userOne.address))
    // --- Deploy ItemMarket ---
    const { itemMarketContract: itemMarketContract_ } = await deployItemMarketContract(ethers)
    itemMarketContract = itemMarketContract_

    // --- Deploy Item ---
    const { itemContract: itemContract_ } = await deployItemContract(ethers)
    itemContract = itemContract_

    // --- List All Items to Market
    await listItemMarket({ itemContract, itemMarketContract })

    // Aprove Metallic coin
    await metallicContract.connect(userOne).approve(itemMarketContract.address, metallicAmount)
  })

  it("Should get items of User wallet when buy items", async function () {
    const itemsIds = [26, 17, 43];
    const amounts = [2, 1, 3];
    for (let index = 0; index < itemsIds.length; index++) {
      await itemMarketContract.connect(userOne).buyItem(metallicContract.address, itemContract.address, itemsIds[index], amounts[index])
    }

    const itemsRaw = await itemContract.getItemsOf(userOne.address)
    itemsRaw.map((item: any) => {
      console.log("Id: ", item.info.id.toNumber(), "Amount: ", item.amount.toNumber());
      // expect(item.amount.toNumber()).to.equal(2)
    })
  })

  it("Should buy an Item in market", async function () {
    const itemId = 17;
    const amount = 2;

    let deployerBalance = await metallicContract.balanceOf(owner.address)
    let addr1Balance = await metallicContract.balanceOf(userOne.address)
    console.log("Before: ", ethers.utils.formatEther(deployerBalance))
    console.log("Before: ", ethers.utils.formatEther(addr1Balance))

    await itemMarketContract.connect(userOne).buyItem(metallicContract.address, itemContract.address, itemId, amount)
    deployerBalance = await metallicContract.balanceOf(owner.address)
    addr1Balance = await metallicContract.balanceOf(userOne.address)
    console.log("After: ", ethers.utils.formatEther(deployerBalance))
    console.log("After: ", ethers.utils.formatEther(addr1Balance))
  })

  it("Should get All Items of Market", async function () {
    const listItemsRaw = await itemMarketContract.getAllItems()
    const listItems = listItemsRaw.map((item: any) => {
      return item.id.toNumber()
    })
    expect(listItems).to.eql(items.itemsIndexes)
  })
})
