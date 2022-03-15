import { expect } from 'chai'
import { before } from 'mocha'
import { Signer } from 'ethers'
import { ethers } from 'hardhat'
import { ItemMarket, Item } from '../../typechain'
import { items } from "../../data/items"

describe('ItemMarket', function () {
  let itemMarketContract: ItemMarket
  let itemContract: Item
  let deployer: Signer

  before(async function () {
    // --- Deploy ItemMarket ---
    const itemMarketContractFactory = await ethers.getContractFactory('ItemMarket')
    deployer = itemMarketContractFactory.signer
    itemMarketContract = await itemMarketContractFactory.deploy()

    await itemMarketContract.deployed()
    console.log('ItemMarket deployed to:', itemMarketContract.address)

    // --- Deploy Item ---
    const itemsList = items

    const itemContractFactory = await ethers.getContractFactory('Item')
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

    // --- List All Items to Market
    for (let index = 0; index < itemsList.itemsIndexes.length; index++) {
      const itemId = itemsList.itemsIndexes[index]
      const itemCost = itemsList.itemsCost[index]
      await itemContract.setApprovalForAll(itemMarketContract.address, true);
      await itemMarketContract.listItem(itemContract.address, itemId, 5, itemCost)
    }
  })

  it("Should get items of User wallet when buy items", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const itemsIds = [26, 17, 43];
    const amounts = [2, 1, 3];
    for (let index = 0; index < itemsIds.length; index++) {
      const itemRaw = await itemContract.getItem(itemsIds[index])
      const item = await itemContract.getItemReadable(itemRaw)
      const costItem = ethers.utils.parseUnits(String(item.cost.toNumber() * amounts[index]), 'ether')
      await itemMarketContract.connect(addr1).buyItem(itemContract.address, itemsIds[index], amounts[index], { value: costItem })
    }

    const itemsRaw = await itemContract.getItemsOf(addr1.address)
    itemsRaw.map(item => {
      console.log("Id: ", item.info.id.toNumber(), "Amount: ", item.amount.toNumber());
      // expect(item.amount.toNumber()).to.equal(2)
    })
  })

  it("Should buy an Item in market", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();
    console.log(owner.address, addr1.address, addr2.address);
    const itemId = 17;
    const amount = 2;
    const itemRaw = await itemContract.getItem(itemId)
    const item = await itemContract.getItemReadable(itemRaw)
    const costItem = ethers.utils.parseUnits(String(item.cost.toNumber() * amount), 'ether')

    let deployerBalance = await deployer.getBalance()
    let addr1Balance = await addr1.getBalance()
    console.log("Before: ", ethers.utils.formatEther(deployerBalance))
    console.log("Before: ", ethers.utils.formatEther(addr1Balance))

    await itemMarketContract.connect(addr1).buyItem(itemContract.address, itemId, amount, { value: costItem })
    deployerBalance = await deployer.getBalance()
    addr1Balance = await addr1.getBalance()
    console.log("After: ", ethers.utils.formatEther(deployerBalance))
    console.log("After: ", ethers.utils.formatEther(addr1Balance))
  })

  it("Should get All Items of Market", async function () {
    const listItemsRaw = await itemMarketContract.getAllItems()
    const listItems = listItemsRaw.map(item => {
      return item.id.toNumber()
    })
    expect(listItems).to.eql(items.itemsIndexes)
  })
})
