//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./PokemonHelper.sol";
import "../interfaces/IPokemonGame.sol";

contract PokemonAttack is PokemonHelper {
    enum BattleStatus { WIN, LOSE }

    address public pokemonGameAddress;

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
}
