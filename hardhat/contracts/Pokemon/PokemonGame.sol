//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

import "../interfaces/IGameRewards.sol";
import "./PokemonFactory.sol";

import "hardhat/console.sol";

/// @title Pokemon
/// @author Alberto Cruz Luis
/// @notice Contract for get Pokemon NFT
/// @dev Contract for get Pokemon NFT
contract PokemonGame is PokemonFactory, ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public gameRewardsAddress;

    event PokemonNFTMinted(address sender, uint256 tokenId, uint256 pokemonId);

    constructor(address gameRewardsAddress_) ERC721("Pokemon", "PKM") {
        gameRewardsAddress = gameRewardsAddress_;
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
        address[] memory _recipients = new address[](1);
        _recipients[0] = msg.sender;
        uint256[] memory _amount = new uint256[](1);
        _amount[0] = (600) * (1 ether);
        IGameRewards(gameRewardsAddress).dropTokens(_recipients, _amount);

        // We map the tokenId => pokemon.
        pokemonsNft[newTokenId] = getPokemon(_pokemonId);

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
}
