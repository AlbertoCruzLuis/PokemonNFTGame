//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract GameRewards is Ownable {
    using SafeERC20 for IERC20;

    address public tokenAddress;
    address public pokemonGameAddress;

    event TokenReceive(address beneficiary, uint amount);

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    modifier onlyPokemonGame() {
        require(pokemonGameAddress == msg.sender, "GameRewards: caller is not the pokemonGameAddress");
        _;
    }

    function dropTokens(address[] memory _recipients, uint256[] memory _amount) public onlyPokemonGame returns (bool) {
        for (uint i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0));
            IERC20(tokenAddress).safeTransfer(_recipients[i], _amount[i]);
            emit TokenReceive(_recipients[i], _amount[i]);
        }

        return true;
    }

    function updatePokemonGameAddress(address _pokemonGameAddress) public onlyOwner {
        pokemonGameAddress = _pokemonGameAddress;
    }

    function updateTokenAddress(address newTokenAddress) public onlyOwner {
        tokenAddress = newTokenAddress;
    }

    function withdrawTokens(address beneficiary, uint256 amount) public onlyOwner {
        IERC20(tokenAddress).safeTransfer(beneficiary, amount);
    }
}
