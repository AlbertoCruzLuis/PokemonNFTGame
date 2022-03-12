//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./library/LPokemonData.sol";

/// @title PokemonData
/// @author Alberto Cruz Luis
/// @notice Contract for save data of Pokemon
/// @dev Contract for save data of Pokemon
contract PokemonData {
    using LPokemonData for LPokemonData.Data;
    LPokemonData.Data public data;

    constructor(
        uint256 id,
        string memory name,
        string memory imageURI,
        LPokemonData.Stats memory stats_
    ) {
        createPokemonData(id, name, imageURI, stats_);
    }

    function createPokemonData(
        uint256 id,
        string memory name,
        string memory imageURI,
        LPokemonData.Stats memory stats_
    ) public {
        data.info.id = id;
        data.info.name = name;
        data.info.imageURI = imageURI;

        data.stats.hp = stats_.hp;
        data.stats.attack = stats_.attack;
        data.stats.maxHp = stats_.maxHp;

        data.level = 1;
        data.experience = 0;
        data.totalExperience = 0;
    }

    function getId() public view returns (uint256) {
        return data.info.id;
    }

    function getName() public view returns (string memory) {
        return data.info.name;
    }

    function getImageUri() public view returns (string memory) {
        return data.info.imageURI;
    }

    function getHp() public view returns (uint256) {
        return data.stats.hp;
    }

    function getMaxHp() public view returns (uint256) {
        return data.stats.maxHp;
    }

    function getAttack() public view returns (uint256) {
        return data.stats.attack;
    }

    function getLevel() public view returns (uint256) {
        return data.level;
    }

    function getExperience() public view returns (uint256) {
        return data.experience;
    }

    function getTotalExperience() public view returns (uint256) {
        return data.totalExperience;
    }

    function getInfo() public view returns (LPokemonData.Info memory) {
        return data.info;
    }

    function getStats() public view returns (LPokemonData.Stats memory) {
        return data.stats;
    }

    function getData() public view returns (LPokemonData.Data memory) {
        return data;
    }

    function changeStats(LPokemonData.Stats memory stats_) public {
        data.stats.hp = stats_.hp;
        data.stats.maxHp = stats_.maxHp;
        data.stats.attack = stats_.attack;
    }

    function changeHp(uint256 hp) public {
        data.stats.hp = hp;
    }

    function changeMaxHp(uint256 maxHp) public {
        data.stats.maxHp = maxHp;
    }

    function changeAttack(uint256 attack) public {
        data.stats.attack = attack;
    }

    function changeLevel(uint256 level) public {
        data.level = level;
    }

    function changeExperience(uint256 experience) public {
        data.experience = experience;
    }

    function changeTotalExperience(uint256 totalExperience) public {
        data.totalExperience = totalExperience;
    }
}
