// I'm a comment!
// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

// pragma solidity ^0.8.0;
// pragma solidity >=0.8.0 <0.9.0;

contract SimpleStorage {
    bytes32 savedHash;

    struct People {
        bytes32 savedHash;
        string name;
    }

    function store(bytes32 _savedHash) public {
        savedHash = _savedHash;
    }

    function retrieve() public view returns (bytes32) {
        return savedHash;
    }
}
