// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract Bar {}

contract Foo {
    Bar public bar;
    string public message;

    constructor(address _bar) {
        require(_bar != address(0), "Should be a non-zero address");
        bar = Bar(_bar);
    }

    function setMessage(string calldata _message) external {
        message = _message;
    }
}
