//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "erc-payable-token/contracts/token/ERC1363/ERC1363.sol";

contract PayableToken is ERC1363 {
  constructor() ERC20("Payable Token", "PTN") {
    ERC20._mint(msg.sender, 10_000_000);
  }
}