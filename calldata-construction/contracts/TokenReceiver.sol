//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "erc-payable-token/contracts/token/ERC1363/IERC1363Receiver.sol";
import "erc-payable-token/contracts/token/ERC1363/IERC1363.sol";

contract TokenReceiver is IERC1363Receiver {
  IERC1363 acceptedToken;
  constructor(IERC1363 _acceptedToken) {
    acceptedToken = _acceptedToken;
  }
  event PurchaseMade(address indexed sender, uint tokensPaid, uint productAmount, bytes3 color);
  function buy(address sender, uint tokensPaid, uint productAmount, bytes3 color) public {
    // allowed to be called only via the accepted token
    require(msg.sender == address(acceptedToken), "I accept purchases in Payable Tokens");
    emit PurchaseMade(sender, tokensPaid, productAmount, color);
  }
  function callDataDecode(bytes memory data) private pure returns (bytes4 selector, uint productAmount, bytes3 color) {
    assembly {
      selector := mload(add(data, 32))
      productAmount := mload(add(data, 64))
      color := mload(add(data, 96))
    }
  }
  function onTransferReceived(address operator, address sender, uint256 tokensPaid, bytes calldata data) external override (IERC1363Receiver) returns (bytes4) {
    // getting from the calldata the information on:
    // - what function to call (buy)
    // - number of ordered products
    // - product color
    (bytes4 selector, uint productAmount, bytes3 color) = callDataDecode(data);
    if (selector == this.buy.selector) {
      buy(sender, tokensPaid, productAmount, color);
    }
    return this.onTransferReceived.selector;
  }
}