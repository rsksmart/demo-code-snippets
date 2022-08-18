// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "erc-payable-token/contracts/token/ERC1363/ERC1363.sol";

contract PayableToken is ERC1363 {
  constructor() ERC20("PayableToken", "PBT") {
    _mint(msg.sender, 1000);
  }
}