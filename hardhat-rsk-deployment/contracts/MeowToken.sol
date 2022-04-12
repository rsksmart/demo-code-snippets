// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MeowToken is ERC20 {
  constructor(uint initialSupply) ERC20("Meow token", "MEO") {
    ERC20._mint(msg.sender, initialSupply);
  }
}