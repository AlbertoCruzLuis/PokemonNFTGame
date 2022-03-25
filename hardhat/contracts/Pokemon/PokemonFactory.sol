//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./LPokemonData.sol";
import "./PokemonData.sol";
import "./PokemonHelper.sol";

contract PokemonFactory is PokemonHelper, Ownable {
    using LPokemonData for LPokemonData.Stats;
    using LPokemonData for LPokemonData.Info;

    address public itemAddress;

    uint256 private _totalPokemons;

    // PokemonId => PokemonData
    mapping(uint256 => PokemonData) public pokemons;

    // tokenId => PokemonData
    mapping(uint256 => PokemonData) public pokemonsNft;

    // Wallet => Array of TokensId
    mapping(address => uint256[]) public nftsOfHolder;

    address[] public holders;

    // BossId => PokemonData
    mapping(uint256 => PokemonData) public bosses;
    uint256[] public bossesIds;

    modifier onlyItem() {
        require(itemAddress == msg.sender, "PokemonFactory: caller is not the itemAddress");
        _;
    }

    function updateItemAddress(address _itemAddress) public onlyOwner {
        itemAddress = _itemAddress;
    }

    function createPokemonsData(
        uint[] memory pokemonIndexes,
        string[] memory pokemonNames,
        string[] memory pokemonImageURIs,
        uint[] memory pokemonHp,
        uint[] memory pokemonAttack
    ) external onlyOwner {
        // Create All Pokemons Data
        for(uint i = 0; i < pokemonIndexes.length; i++) {
            uint256 index = pokemonIndexes[i];
            pokemons[index] = new PokemonData(
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

        _totalPokemons += pokemonIndexes.length;
    }

    function createBossesData(
        uint[] memory _bossesIds,
        uint[] memory bossesLevel
    ) external onlyOwner {
        // Create All Bosses
        for(uint i = 0; i < _bossesIds.length; i++) {
            _createBoss(_bossesIds[i], bossesLevel[i]);
            bossesIds.push(_bossesIds[i]);
        }
    }

    function _createBoss(uint256 pokemonId, uint256 level) internal {
        PokemonData boss = getPokemon(pokemonId);
        boss.changeLevel(level);
        boss.changeMaxHp(boss.getMaxHp() + level);
        boss.changeAttack(boss.getAttack() + level);
        boss.changeHp(boss.getMaxHp());
        boss.changeTotalExperience(getTotalExperienceByLevel(level));
        bosses[pokemonId] = boss;
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

    function changeHpOf(uint pokemonIndex, address account, uint256 hp, bool isIncrement) public onlyItem {
        PokemonData pokemon = getPokemonByIndexOf(pokemonIndex, account);
        if (isIncrement) {
            pokemon.changeHpIncrement(hp);
        } else {
            pokemon.changeHp(hp);
        }
    }


    function getAllPokemons() public view returns(PokemonData[] memory) {
        uint256 totalPokemons = getTotalPokemons();
        PokemonData[] memory pokemons_ = new PokemonData[](totalPokemons);

        for (uint256 index = 1; index <= totalPokemons; index++) {
            pokemons_[index - 1] = pokemons[index];
        }

        return pokemons_;
    }

    function getPokemonsOf(address sender) public view returns (LPokemonData.Data[] memory) {
        uint256[] memory tokensIds = nftsOfHolder[sender];

        LPokemonData.Data[] memory pokemons_ = new LPokemonData.Data[](tokensIds.length);
        for (uint256 index = 0; index < tokensIds.length; index++) {
            uint256 tokenId = tokensIds[index];
            pokemons_[index] = pokemonsNft[tokenId].getData();
        }
        return pokemons_;
    }

    function getPokemonByIndexOf(uint256 pokemonIndex, address sender) public view returns (PokemonData) {
        uint256 nftTokenIdOfPlayer = nftsOfHolder[sender][pokemonIndex];
        PokemonData pokemon = getPokemonNft(nftTokenIdOfPlayer);
        return pokemon;
    }

    function getPokemonSelected(address sender, uint pokemonIndex) public view returns (LPokemonData.Data memory) {
        require(nftsOfHolder[sender].length >= pokemonIndex, "GT");
        uint256 tokenId = nftsOfHolder[sender][pokemonIndex];
        LPokemonData.Data memory pokemonSelected = pokemonsNft[tokenId].getData();
        return pokemonSelected;
    }

    function getBoss(uint256 id) public view returns (PokemonData) {
        return bosses[id];
    }

    function getAllBossesIds() public view returns (uint256[] memory) {
        return bossesIds;
    }

    function getPokemon(uint256 id) public view returns (PokemonData) {
        return pokemons[id];
    }

    function getPokemonNft(uint256 tokenId) public view returns (PokemonData) {
        return pokemonsNft[tokenId];
    }

    function getTotalPokemons() public view returns (uint256) {
        return _totalPokemons;
    }

    function getPokemonReadable(PokemonData pokemonData) public view returns(LPokemonData.Data memory) {
        LPokemonData.Data memory data = pokemonData.getData();
        return data;
    }
}
