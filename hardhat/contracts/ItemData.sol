//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./library/LItemData.sol";

/// @title PokemonData
/// @author Alberto Cruz Luis
/// @notice Contract for save data of Pokemon
/// @dev Contract for save data of Pokemon
contract ItemData {
    using LItemData for LItemData.Data;
    LItemData.Data public data;

    constructor(
        uint256 id,
        string memory category,
        string memory name,
        string memory description,
        string memory imageURI,
        uint256 cost,
        uint256 effect
    ) {
        createItemData(id, category, name, description, imageURI, cost, effect);
    }

    function createItemData(
        uint256 id,
        string memory category,
        string memory name,
        string memory description,
        string memory imageURI,
        uint256 cost,
        uint256 effect
    ) public {
        data.info.id = id;
        data.info.category = category;
        data.info.name = name;
        data.info.description = description;
        data.info.imageURI = imageURI;
        data.info.effect = effect;

        data.cost = cost;
        data.amount = 0;
    }

    function getId() public view returns (uint256) {
        return data.info.id;
    }

    function getCategory() public view returns (string memory) {
        return data.info.category;
    }

    function getName() public view returns (string memory) {
        return data.info.name;
    }

    function getDescription() public view returns (string memory) {
        return data.info.description;
    }

    function getImageUri() public view returns (string memory) {
        return data.info.imageURI;
    }

    function getEffect() public view returns (uint256) {
        return data.info.effect;
    }

    function getCost() public view returns (uint256) {
        return data.cost;
    }

    function getInfo() public view returns (LItemData.Info memory) {
        return data.info;
    }

    function getData() public view returns (LItemData.Data memory) {
        return data;
    }

    function changeCost(uint256 cost) public {
        data.cost = cost;
    }
}
