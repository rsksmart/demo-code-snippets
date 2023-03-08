// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GateKeeper {
    address public entrant;

    modifier gateOne() {
        require(msg.sender != tx.origin, 'GateKeeper: gate 1 not passed');
        _;
    }

    modifier gateTwo() {
        require(msg.sender.code.length == 0, 'GateKeeper: gate 2 not passed');
        _;
    }

    modifier gateThree(bytes8 _gateKey) {
        require(
            uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^
                uint64(_gateKey) ==
                type(uint64).max,
            'GateKeeper: gate 3 not passed'
        );
        _;
    }

    function enter(
        bytes8 _gateKey
    ) public gateOne gateTwo gateThree(_gateKey) returns (bool) {
        entrant = tx.origin;
        return true;
    }
}
