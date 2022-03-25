//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./PokemonHelper.sol";
import "../interfaces/IPokemonGame.sol";
import "../interfaces/IItem.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PokemonAttack is PokemonHelper, Ownable {
    enum BattleStatus { WIN, LOSE }

    address public pokemonGameAddress;
    address public itemAddress;

    event AttackComplete(uint256 newBossHp, uint256 newPokemonHp, address sender, uint256 timestamp);
    event BattleComplete(BattleStatus status, address sender, uint256 timestamp);

    constructor(address pokemonGameAddress_) {
        pokemonGameAddress = pokemonGameAddress_;
    }

    function attackBoss(uint256 pokemonIndex, uint256 bossId) public {
        PokemonData player = PokemonData(IPokemonGame(pokemonGameAddress).getPokemonByIndexOf(pokemonIndex, msg.sender));
        PokemonData boss = PokemonData(IPokemonGame(pokemonGameAddress).getBoss(bossId));

        require (player.getHp() > 0, "Error. Player don't have Hp");
        require (boss.getHp() > 0, "Error. Boss don't have Hp");

        // Allow player to attack boss.
        bool isUpExperience = true;
        attack(player, boss, BattleStatus.WIN, isUpExperience);

        // Allow boss to attack player.
        isUpExperience = false;
        attack(boss, player, BattleStatus.LOSE, isUpExperience);

        checkGiveRewards(boss);
        checkLevelUp(player);

        emit AttackComplete(boss.getHp(), player.getHp(), msg.sender, block.timestamp);
    }

    function attack(PokemonData pokemonOne, PokemonData pokemonTwo, BattleStatus status, bool isUpExperience) internal {
        if (pokemonTwo.getHp() <= pokemonOne.getAttack()) {
            pokemonTwo.changeHp(0);
            emit BattleComplete(status, msg.sender, block.timestamp);
        } else {
            pokemonTwo.changeHp(pokemonTwo.getHp() - pokemonOne.getAttack());
        }
        if(isUpExperience) {
            pokemonOne.changeExperience(pokemonOne.getExperience() + (6 * pokemonTwo.getLevel()));
        }
    }

    function checkGiveRewards(PokemonData boss) internal {
        uint256 potionId = 17;
        uint256 hyperPotionId = 25;

        if(boss.getHp() == 0) {
            if(boss.getLevel() == 20) {
                // Rewards: 1 Potion
                IItem(itemAddress).mint(msg.sender, potionId, 1);
            }
            if(boss.getLevel() == 30) {
                // Rewards: 2 Potion
                IItem(itemAddress).mint(msg.sender, potionId, 2);
            }
            if(boss.getLevel() == 40) {
                // Rewards: 2 Potion and 1 Hyper Potion
                IItem(itemAddress).mint(msg.sender, potionId, 2);
                IItem(itemAddress).mint(msg.sender, hyperPotionId, 1);
            }
        }
    }

    function updateItemAddress(address _itemAddress) public onlyOwner {
        itemAddress = _itemAddress;
    }
}
