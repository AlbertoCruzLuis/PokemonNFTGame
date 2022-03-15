//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

library LItemData {
    struct Info {
        uint256 id;
        string category;
        string name;
        string description;
        string imageURI;
        uint256 effect;
    }

    struct Data {
        Info info;
        uint256 cost;
        uint256 amount;
    }
}
