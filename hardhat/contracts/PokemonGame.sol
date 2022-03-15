//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./PokemonData.sol";
import "./library/LPokemonData.sol";

import "hardhat/console.sol";

/// @title Pokemon
/// @author Alberto Cruz Luis
/// @notice Contract for get Pokemon NFT
/// @dev Contract for get Pokemon NFT
contract PokemonGame is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    using LPokemonData for LPokemonData.Stats;
    using LPokemonData for LPokemonData.Info;

    uint256 private _totalPokemons;

    // PokemonId => PokemonData
    mapping(uint256 => PokemonData) private _pokemons;

    // tokenId => PokemonData
    mapping(uint256 => PokemonData) private _pokemonsNft;

    // Wallet => Array of TokensId
    mapping(address => uint256[]) public nftsOfHolder;

    address[] public holders;

    // BossId => PokemonData
    mapping(uint256 => PokemonData) public bosses;

    enum BattleStatus { WIN, LOSE }

    event PokemonNFTMinted(address sender, uint256 tokenId, uint256 pokemonId);
    event AttackComplete(uint256 newBossHp, uint256 newPokemonHp);
    event BattleComplete(BattleStatus status);
    event LevelUp(uint256 level, LPokemonData.Stats stats);

    constructor(
        uint[] memory pokemonIndexes,
        string[] memory pokemonNames,
        string[] memory pokemonImageURIs,
        uint[] memory pokemonHp,
        uint[] memory pokemonAttack,
        uint[] memory bossesIds,
        uint[] memory bossesLevel
    )
        ERC721("Pokemon", "PKM")
    {
        // Create All Pokemons Data
        for(uint i = 0; i < pokemonIndexes.length; i += 1) {
            _pokemons[i+1] = new PokemonData(
                pokemonIndexes[i],
                pokemonNames[i],
                pokemonImageURIs[i],
                LPokemonData.Stats({
                    hp: pokemonHp[i],
                    maxHp: pokemonHp[i],
                    attack: pokemonAttack[i]
                })
            );
        }

        _totalPokemons = pokemonIndexes.length;

        // Create All Bosses
        for(uint i = 0; i < bossesIds.length; i++) {
            createBoss(bossesIds[i], bossesLevel[i]);
        }

        // I increment _tokenIds here so that my first NFT has an ID of 1.
        _tokenIds.increment();
    }

    // Users would be able to hit this function and get their NFT based on the
    // pokemonId they send in!
    function mint(uint _pokemonId) external {
        // Get current tokenId (starts at 1 since we incremented in the constructor).
        uint256 newTokenId = _tokenIds.current();

        // Assigns the tokenId to the caller's wallet address.
        _safeMint(msg.sender, newTokenId);

        // We map the tokenId => pokemon.
        _pokemonsNft[newTokenId] = getPokemon(_pokemonId);

        nftsOfHolder[msg.sender].push(newTokenId);

        // Increment the tokenId for the next person that uses it.
        _tokenIds.increment();

        emit PokemonNFTMinted(msg.sender, newTokenId, _pokemonId);
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        PokemonData pokemonData = getPokemonNft(_tokenId);

        string memory strHp = Strings.toString(pokemonData.getHp());
        string memory strMaxHp = Strings.toString(pokemonData.getMaxHp());
        string memory strAttack = Strings.toString(pokemonData.getAttack());
        string memory strLevel = Strings.toString(pokemonData.getLevel());
        string memory strTotalExperience = Strings.toString(pokemonData.getTotalExperience());
        string memory strTokenId = Strings.toString(_tokenId);

        string memory json = Base64.encode(
            abi.encodePacked(
            '{"name": "',pokemonData.getName(),' #: ',strTokenId,'",',
            '"description": "This is an NFT that lets people play in the game Pokemon NFT!",',
            '"image": "',pokemonData.getImageUri(),'",',
            '"attributes": [',
            '{ "trait_type": "Health Points", "value": ',strHp,', "max_value":',strMaxHp,'},',
            '{ "trait_type": "Attack Damage", "value": ',strAttack,'},',
            '{ "trait_type": "Total Experience", "value": ',strTotalExperience,'},',
            '{ "trait_type": "Level", "value":', strLevel,'} ]}'
            )
        );

        string memory output = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        return output;
    }

    function createBoss(uint256 pokemonId, uint256 level) internal {
        PokemonData boss = getPokemon(pokemonId);
        boss.changeLevel(level);
        boss.changeMaxHp(boss.getMaxHp() + level);
        boss.changeAttack(boss.getAttack() + level);
        boss.changeHp(boss.getMaxHp());
        boss.changeTotalExperience(getTotalExperienceByLevel(level));
        bosses[pokemonId] = boss;
    }

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
            emit LevelUp(player.getLevel(), player.getStats());
        }
    }

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

    function hasNft() public view returns (LPokemonData.Data memory) {
        uint256 totalPokemonsOfSender = nftsOfHolder[msg.sender].length;

        if (totalPokemonsOfSender > 0) {
            uint256 firstTokenId = nftsOfHolder[msg.sender][0];
            LPokemonData.Data memory pokemonData = getPokemonNft(firstTokenId).getData();
            return pokemonData;
        } else {
            LPokemonData.Data memory emptyPokemon;
            return emptyPokemon;
        }
    }

    // TODO: create onlyContract modifier for security
    function changeHpOf(uint pokemonIndex, address account, uint256 hp, bool isIncrement) public {
        PokemonData pokemon = getPokemonByIndexOf(pokemonIndex, account);
        if (isIncrement) {
            pokemon.changeHpIncrement(hp);
        } else {
            pokemon.changeHp(hp);
        }
    }

    function getAllPokemons() public view returns(PokemonData[] memory) {
        uint256 totalPokemons = getTotalPokemons();
        PokemonData[] memory pokemons = new PokemonData[](totalPokemons);

        for (uint256 index = 1; index <= totalPokemons; index++) {
            pokemons[index - 1] = _pokemons[index];
        }

        return pokemons;
    }

    function getPokemonsOf(address sender) public view returns (LPokemonData.Data[] memory) {
        uint256[] memory tokensIds = nftsOfHolder[sender];

        LPokemonData.Data[] memory pokemons = new LPokemonData.Data[](tokensIds.length);
        for (uint256 index = 0; index < tokensIds.length; index++) {
            uint256 tokenId = tokensIds[index];
            pokemons[index] = _pokemonsNft[tokenId].getData();
        }
        return pokemons;
    }

    function getPokemonSelected(address sender, uint pokemonIndex) public view returns (LPokemonData.Data memory) {
        require(nftsOfHolder[sender].length >= pokemonIndex, "Error. PokemonIndex selected greater than size of pokemons available");
        uint256 tokenId = nftsOfHolder[sender][pokemonIndex];
        LPokemonData.Data memory pokemonSelected = _pokemonsNft[tokenId].getData();
        return pokemonSelected;
    }

    function getBoss(uint256 id) public view returns (PokemonData) {
        return bosses[id];
    }

    function getPokemon(uint256 id) public view returns (PokemonData) {
        return _pokemons[id];
    }

    function getPokemonNft(uint256 tokenId) public view returns (PokemonData) {
        return _pokemonsNft[tokenId];
    }

    function getPokemonByIndexOf(uint256 pokemonIndex, address sender) public view returns (PokemonData) {
        uint256 nftTokenIdOfPlayer = nftsOfHolder[sender][pokemonIndex];
        PokemonData pokemon = getPokemonNft(nftTokenIdOfPlayer);
        return pokemon;
    }

    function getTotalPokemons() public view returns (uint256) {
        return _totalPokemons;
    }

    function getTotalPokemonsMinted() public view returns (uint256) {
        uint256 lastPokemon = _tokenIds.current();
        return lastPokemon;
    }

    function getPokemonReadable(PokemonData pokemonData) public view returns(LPokemonData.Data memory) {
        LPokemonData.Data memory data = pokemonData.getData();
        return data;
    }
}
