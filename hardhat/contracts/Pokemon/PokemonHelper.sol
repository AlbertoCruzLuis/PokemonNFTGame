//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./LPokemonData.sol";
import "./PokemonData.sol";

contract PokemonHelper {
    using LPokemonData for LPokemonData.Stats;
    event LevelUp(uint256 level, LPokemonData.Stats stats, address sender, uint256 timestamp);
    function getTotalExperienceByLevel(uint256 level) internal pure returns (uint256) {
        uint256 totalExperience;
        for (uint256 index = 1; index < level; index++) {
            totalExperience += experienceNextLevel(index);
        }
        return totalExperience;
    }

    function experienceNextLevel(uint256 level) internal pure returns (uint256) {
        uint256 required_xp = (4 * (level ** 3) / 100) + (8 * (level ** 2) / 10) + 2 * level;
        return required_xp;
    }

    function checkLevelUp(PokemonData player) internal {
        player.changeTotalExperience(player.getTotalExperience() + player.getExperience());

        // Check if can levelUp
        while(player.getExperience() >= experienceNextLevel(player.getLevel())) {
            uint256 level = player.getLevel();
            uint256 experience = player.getExperience();

            player.changeExperience(experience - experienceNextLevel(level));
            player.changeMaxHp(player.getMaxHp() + 1);
            player.changeAttack(player.getAttack() + 1);
            player.changeLevel(level + 1);
            emit LevelUp(player.getLevel(), player.getStats(), msg.sender, block.timestamp);
        }
    }
}
