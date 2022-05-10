//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MeowToken is ERC20, Ownable {
  constructor(uint initialSupply) ERC20("Meow Token", "MEO") {
    ERC20._mint(msg.sender, initialSupply);
  }
}