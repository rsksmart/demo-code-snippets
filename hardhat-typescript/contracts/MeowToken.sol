//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MeowToken is ERC20 {
  constructor(uint initialSupply) ERC20("Meow Token", "MEO") {
    ERC20._mint(msg.sender, initialSupply);
  }
}