//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library LPokemonData {
    struct Stats {
        uint256 hp;
        uint256 maxHp;
        uint256 attack;
    }

    struct Info {
        uint256 id;
        string name;
        string imageURI;
    }

    struct Data {
        Info info;
        Stats stats;
        uint256 level;
        uint256 experience;
        uint256 totalExperience;
    }
}
