// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

contract MegaHonk {
    uint256 public count;

    event LoudSound(address indexed source);

    function honk() external {
        require(tx.origin != msg.sender, "EOA not allowed");
        count += 1;
        emit LoudSound(tx.origin);
    }
}
