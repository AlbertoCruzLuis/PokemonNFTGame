//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "../Item/LItemData.sol";
import "../Pokemon/LPokemonData.sol";

interface IItem {
    event ApprovalForAll(
        address indexed account,
        address indexed operator,
        bool approved
    );
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 value
    );
    event URI(string value, uint256 indexed id);
    event UseItem(
        LPokemonData.Data pokemon,
        LItemData.Data item,
        address sender,
        uint256 timestamp
    );

    function _itemsOfHolder(address, uint256)
        external
        view
        returns (uint256 id, uint256 amount);

    function balanceOf(address account, uint256 id)
        external
        view
        returns (uint256);

    function balanceOfBatch(address[] memory accounts, uint256[] memory ids)
        external
        view
        returns (uint256[] memory);

    function burn(
        address account,
        uint256 id,
        uint256 value
    ) external;

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) external;

    function createItemsData(
        uint256[] memory itemsIndexes,
        string[] memory itemsNames,
        string[] memory itemsDescription,
        string[] memory itemsImageURIs,
        string[] memory itemsCategory,
        uint256[] memory itemsCost,
        uint256[] memory itemsEffect
    ) external;

    function getAllItems() external view returns (LItemData.Data[] memory);

    function getItem(uint256 id) external view returns (address);

    function getItemNft(uint256 tokenId) external view returns (address);

    function getItemReadable(address itemData)
        external
        view
        returns (LItemData.Data memory);

    function getItemsOf(address sender)
        external
        view
        returns (LItemData.Data[] memory);

    function getTotalItems() external view returns (uint256);

    function isApprovedForAll(address account, address operator)
        external
        view
        returns (bool);

    function mint(
        address account,
        uint256 id,
        uint256 amount
    ) external;

    function mintBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) external;

    function owner() external view returns (address);

    function renounceOwnership() external;

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) external;

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) external;

    function setApprovalForAll(address operator, bool approved) external;

    function setURI(string memory newuri) external;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);

    function transferOwnership(address newOwner) external;

    function uri(uint256 _tokenId) external view returns (string memory);

    function useItem(
        address _contractAddress,
        uint256 pokemonIndex,
        uint256 itemId
    ) external;
}
