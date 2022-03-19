// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "./LItemData.sol";
import "../Pokemon/LPokemonData.sol";
import "./ItemData.sol";
import "../interfaces/IPokemonGame.sol";

import "hardhat/console.sol";

/// @title Item
/// @author Alberto Cruz Luis
/// @notice Item of Pokemon Game
/// @dev Item of Pokemon Game
contract Item is ERC1155, Ownable, ERC1155Burnable {
    // ItemId => ItemData
    mapping(uint256 => ItemData) private _items;

    uint256[] itemsIds;

    // tokenId => ItemData
    mapping(uint256 => ItemData) private _itemsNft;

    struct InfoItem {
        uint256 id;
        uint256 amount;
    }

    // Wallet => mapping of itemId => InfoItem
    mapping(address => mapping(uint256 => InfoItem)) public _itemsOfHolder;

    event UseItem(LPokemonData.Data pokemon, LItemData.Data item, address sender, uint256 timestamp);
    constructor() ERC1155("") {}

    function createItemsData(
        uint[] memory itemsIndexes,
        string[] memory itemsNames,
        string[] memory itemsDescription,
        string[] memory itemsImageURIs,
        string[] memory itemsCategory,
        uint[] memory itemsCost,
        uint[] memory itemsEffect
    ) external onlyOwner {
        // Create All Items Data
        for(uint i = 0; i < itemsIndexes.length; i++) {
            _items[itemsIndexes[i]] = new ItemData(
                itemsIndexes[i],
                itemsCategory[i],
                itemsNames[i],
                itemsDescription[i],
                itemsImageURIs[i],
                itemsCost[i],
                itemsEffect[i]
            );
            itemsIds.push(itemsIndexes[i]);
        }

        // Mint 100 units of each Item
        for(uint i = 0; i < itemsIndexes.length; i++) {
            uint256 itemId = itemsIndexes[i];
            uint256 amount = 100;
            mint(msg.sender, itemId, amount);
        }
    }

    function uri(uint256 _tokenId) public view override returns (string memory) {
        ItemData itemData = getItemNft(_tokenId);

        string memory json = Base64.encode(
            abi.encodePacked(
            '{"name": "',itemData.getName(),'",',
            '"description": "This is an Item of game Pokemon NFT!",',
            '"image": "',itemData.getImageUri(),'"}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(address account, uint256 id, uint256 amount)
        public
        onlyOwner
    {
        _mint(account, id, amount, "0x");

        _itemsNft[id] = getItem(id);
        _itemsNft[id].getData().amount += amount;

        _itemsOfHolder[account][id].id = id;
        _itemsOfHolder[account][id].amount += amount;
    }

    function mintBatch(address account, uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOwner
    {
        _mintBatch(account, ids, amounts, "0x");

        for (uint index = 0; index < ids.length; index++) {
            uint256 itemId = ids[index];
            _itemsNft[itemId] = getItem(ids[index]);
            _itemsNft[itemId].getData().amount += amounts[index];


            _itemsOfHolder[account][ids[index]].id = ids[index];
            _itemsOfHolder[account][ids[index]].amount += amounts[index];
        }
    }

    function useItem(address _contractAddress, uint256 pokemonIndex, uint256 itemId ) public {
        ItemData item = getItemNft(itemId);
        uint256 fullHP = 99999;

        if(item.getEffect() == fullHP) {
            uint256 maxHp = IPokemonGame(_contractAddress).getPokemonSelected(msg.sender, pokemonIndex).stats.maxHp;

            IPokemonGame(_contractAddress).changeHpOf(pokemonIndex, msg.sender, maxHp, false);
        } else {
            uint256 hp = item.getEffect();
            IPokemonGame(_contractAddress).changeHpOf(pokemonIndex, msg.sender, hp, true);
        }

        _burn(msg.sender, itemId, 1);
        emit UseItem(
            IPokemonGame(_contractAddress).getPokemonSelected(msg.sender, pokemonIndex),
            getItemReadable(item),
            msg.sender,
            block.timestamp
        );
    }

    function getAllItems() public view returns (LItemData.Data[] memory) {
        uint256 totalItems = getTotalItems();

        LItemData.Data[] memory items = new LItemData.Data[](totalItems);
        for (uint256 index = 0; index < totalItems; index++) {
            uint256 id = itemsIds[index];
            items[index] = getItem(id).getData();
        }
        return items;
    }

    function getItemsOf(address sender) public view returns(LItemData.Data[] memory) {
        uint256 totalItems = getTotalItems();
        uint256 totalItemOfUser;
        uint256 currentIndex;
        for (uint index = 0; index < totalItems; index++) {
            if(balanceOf(sender, itemsIds[index]) > 0) {
                totalItemOfUser++;
            }
        }
        LItemData.Data[] memory items = new LItemData.Data[](totalItemOfUser);
        for (uint256 index = 0; index < totalItems; index++) {
            if(balanceOf(sender, itemsIds[index]) > 0) {
                uint256 id = itemsIds[index];
                items[currentIndex] = getItem(id).getData();
                items[currentIndex].amount = balanceOf(sender, itemsIds[index]);
                currentIndex++;
            }
        }
        return items;
    }

    function getItem(uint256 id) public view returns (ItemData) {
        return _items[id];
    }

    function getItemNft(uint256 tokenId) public view returns (ItemData) {
        return _itemsNft[tokenId];
    }

    function getTotalItems() public view returns (uint256) {
        return itemsIds.length;
    }

    function getItemReadable(ItemData itemData) public view returns(LItemData.Data memory) {
        LItemData.Data memory data = itemData.getData();
        return data;
    }
}
