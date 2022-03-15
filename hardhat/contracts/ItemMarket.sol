//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

import "./interfaces/IMetallic.sol";

import "hardhat/console.sol";

contract ItemMarket is ERC1155Holder, ReentrancyGuard {
    struct SaleInfo {
        address payable seller;
        uint256 id;
        uint256 amount;
        uint256 price;
    }

    // from saleID to SaleInfo
    // the largest possible saleID is 65535
    mapping (uint16 => SaleInfo) public inventory;

    uint16[] salesIds;

    event ListItem(
        address indexed seller,
        address indexed tokenAddress,
        uint256 id,
        uint256 amount,
        uint256 price
    );

    event RemoveItem(
        address indexed seller,
        address indexed tokenAddress,
        uint256 id,
        uint256 amount
    );

    event BuyItem(
        address indexed buyer,
        address indexed seller,
        address indexed tokenAddress,
        uint256 id,
        uint256 amount,
        uint256 price
    );

    /// @param _tokenAddress the address of ERC1155
    /// @param _id the token id inside ERC1155
    /// @param _amount amount to list
    /// @param _price price of each unit in Wei
    function listItem(address _tokenAddress, uint256 _id, uint256 _amount, uint256 _price) public {
        require(_price > 0, "Price must be at least 1 wei");
        require(_amount != 0, "MarketPlace: nothing to list.");

        uint16 saleID = uint16(_id);
        SaleInfo storage saleInfo = inventory[saleID];
        require(saleInfo.amount == 0, "MarketPlace: cancel existing listing first.");

        saleInfo.id = _id;
        saleInfo.amount = _amount;
        saleInfo.price = _price;
        saleInfo.seller = payable(msg.sender);
        salesIds.push(saleID);
        IERC1155(_tokenAddress).safeTransferFrom(msg.sender, address(this), _id, _amount, "");

        emit ListItem(msg.sender, _tokenAddress, _id, _amount, _price);
    }

    /// @param _tokenAddress the address of ERC1155
    /// @param _id the token id inside ERC1155
    /// @param _amount amount to remove
    function removeItem(address _tokenAddress, uint256 _id, uint256 _amount) public {
        require(_amount != 0, "MarketPlace: nothing to remove.");

        uint16 saleID = uint16(_id);
        SaleInfo storage saleInfo = inventory[saleID];
        require(saleInfo.amount >= _amount, "MarketPlace: not enough to remove.");

        saleInfo.amount = saleInfo.amount - _amount;
        IERC1155(_tokenAddress).safeTransferFrom(address(this), msg.sender, _id, _amount, "");

        emit RemoveItem(msg.sender, _tokenAddress, _id, _amount);
    }

    /// @param _tokenAddress the address of ERC1155
    /// @param _id the token id inside ERC1155
    /// @param _amount amount to buy
    function buyItem(address _metallicAddress, address _tokenAddress, uint256 _id, uint256 _amount) public payable nonReentrant {
        require(_amount != 0, "MarketPlace: nothing to buy.");

        uint16 saleID = uint16(_id);
        SaleInfo storage saleInfo = inventory[saleID];
        require(saleInfo.amount >= _amount, "MarketPlace: not enough to sell.");

        uint _price = saleInfo.price;
        uint totalPrice = _price * _amount * (1 ether);
        require(IMetallic(_metallicAddress).balanceOf(msg.sender) >= totalPrice, "Marketplace: not enought MTL to cover total price.");

        uint256 allowance = IMetallic(_metallicAddress).allowance(msg.sender, address(this));
        require(allowance >= totalPrice, "Check the token allowance");

        IMetallic(_metallicAddress).transferFrom(msg.sender, saleInfo.seller, totalPrice);

        IERC1155(_tokenAddress).safeTransferFrom(address(this), msg.sender, _id, _amount, "");

        saleInfo.amount -= _amount;

        emit BuyItem(msg.sender, saleInfo.seller, _tokenAddress, _id, _amount, _price);
    }

    function getAllItems() public view returns(SaleInfo[] memory) {
        uint256 totalItems = getTotalItems();
        SaleInfo[] memory items = new SaleInfo[](totalItems);

        for (uint index = 0; index < totalItems; index++) {
            uint16 id = uint16(index);
            uint16 itemId = salesIds[id];
            items[index] = inventory[itemId];
        }
        return items;
    }

    function getTotalItems() public view returns(uint256) {
        return salesIds.length;
    }
}
