//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./PokemonFactory.sol";

contract PokemonAttack is PokemonFactory {
    enum BattleStatus { WIN, LOSE }

    event AttackComplete(uint256 newBossHp, uint256 newPokemonHp);
    event BattleComplete(BattleStatus status);

    function attackBoss(uint256 pokemonIndex, uint256 bossId) public {
        PokemonData player = getPokemonByIndexOf(pokemonIndex, msg.sender);

        // Allow player to attack boss.
        bool isUpExperience = true;
        attack(player, bosses[bossId], BattleStatus.WIN, isUpExperience);

        // Allow boss to attack player.
        isUpExperience = false;
        attack(bosses[bossId], player, BattleStatus.LOSE, isUpExperience);

        checkLevelUp(player);

        emit AttackComplete(bosses[bossId].getHp(), player.getHp());
    }

    function attack(PokemonData pokemonOne, PokemonData pokemonTwo, BattleStatus status, bool isUpExperience) internal {
        require (pokemonOne.getHp() > 0, "Error. PokemonOne don't have Hp");
        require (pokemonTwo.getHp() > 0, "Error. PokemonTwo don't have Hp");

        if (pokemonTwo.getHp() <= pokemonOne.getAttack()) {
            pokemonTwo.changeHp(0);
            emit BattleComplete(status);
        } else {
            pokemonTwo.changeHp(pokemonTwo.getHp() - pokemonOne.getAttack());
        }
        if(isUpExperience) {
            pokemonOne.changeExperience(pokemonOne.getExperience() + (6 * pokemonTwo.getLevel()));
        }
    }
}
