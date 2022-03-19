//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

interface IGameRewards {
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    event TokenReceive(address beneficiary, uint256 amount);

    function dropTokens(address[] memory _recipients, uint256[] memory _amount)
        external
        returns (bool);

    function owner() external view returns (address);

    function pokemonGameAddress() external view returns (address);

    function renounceOwnership() external;

    function tokenAddress() external view returns (address);

    function transferOwnership(address newOwner) external;

    function updateTokenAddress(address newTokenAddress) external;

    function withdrawTokens(address beneficiary, uint256 amount) external;
}
