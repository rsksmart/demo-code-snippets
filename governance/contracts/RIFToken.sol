//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RIFToken is ERC20 {
  constructor(uint _totalSupply) ERC20("RIF", "RIF") {
    ERC20._mint(msg.sender, _totalSupply);
  }

/*   function decimals() public pure override returns(uint8) {
    return 18;
  } */
}
