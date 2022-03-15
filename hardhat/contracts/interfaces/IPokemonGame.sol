//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "../library/LPokemonData.sol";

interface IPokemonGame {
    event Approval(
        address indexed owner,
        address indexed approved,
        uint256 indexed tokenId
    );
    event ApprovalForAll(
        address indexed owner,
        address indexed operator,
        bool approved
    );
    event AttackComplete(uint256 newBossHp, uint256 newPokemonHp);
    event BattleComplete(uint8 status);
    event LevelUp(uint256 level, LPokemonData.Stats stats);
    event PokemonNFTMinted(address sender, uint256 tokenId, uint256 pokemonId);
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId
    );

    function approve(address to, uint256 tokenId) external;

    function attackBoss(uint256 pokemonIndex, uint256 bossId) external;

    function balanceOf(address owner) external view returns (uint256);

    function bosses(uint256) external view returns (address);

    function changeHpOf(
        uint256 pokemonIndex,
        address account,
        uint256 hp,
        bool isIncrement
    ) external;

    function getAllPokemons() external view returns (address[] memory);

    function getApproved(uint256 tokenId) external view returns (address);

    function getBoss(uint256 id) external view returns (address);

    function getPokemon(uint256 id) external view returns (address);

    function getPokemonByIndexOf(uint256 pokemonIndex, address sender)
        external
        view
        returns (address);

    function getPokemonNft(uint256 tokenId) external view returns (address);

    function getPokemonReadable(address pokemonData)
        external
        view
        returns (LPokemonData.Data memory);

    function getPokemonSelected(address sender, uint256 pokemonIndex)
        external
        view
        returns (LPokemonData.Data memory);

    function getPokemonsOf(address sender)
        external
        view
        returns (LPokemonData.Data[] memory);

    function getTotalPokemons() external view returns (uint256);

    function getTotalPokemonsMinted() external view returns (uint256);

    function hasNft() external view returns (LPokemonData.Data memory);

    function holders(uint256) external view returns (address);

    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool);

    function mint(uint256 _pokemonId) external;

    function name() external view returns (string memory);

    function nftsOfHolder(address, uint256) external view returns (uint256);

    function ownerOf(uint256 tokenId) external view returns (address);

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) external;

    function setApprovalForAll(address operator, bool approved) external;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function symbol() external view returns (string memory);

    function tokenURI(uint256 _tokenId) external view returns (string memory);

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
}
