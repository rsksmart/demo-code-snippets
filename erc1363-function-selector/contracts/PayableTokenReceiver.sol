// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "erc-payable-token/contracts/token/ERC1363/IERC1363Receiver.sol";
import "./PayableToken.sol";

contract PayableTokenReceiver is IERC1363Receiver {
  PayableToken acceptedToken;

  event EventA(address, uint256, uint256);
  event EventB(address, uint256, bytes3);
  event EventC(address, uint256, string);

  modifier acceptedTokenOnly() {
    require(msg.sender == address(acceptedToken), "Accept PayableTokens only");
    _;
  }
  constructor(PayableToken _acceptedToken) {
    acceptedToken = _acceptedToken;
  }

  function methodA(address _sender, uint256 _amount, uint256 _value) public acceptedTokenOnly {
    emit EventA(_sender, _amount, _value);
  }

  function methodB(address _sender, uint256 _amount, bytes3 _value) public acceptedTokenOnly {
    emit EventB(_sender, _amount, _value);
  }

  function methodC(address _sender, uint256 _amount, string memory _value) public acceptedTokenOnly {
    emit EventC(_sender, _amount, _value);
  }

  function onTransferReceived(
    address /* _spender */,
    address _sender,
    uint256 _amount,
    bytes calldata _data
  ) external returns (bytes4) {
    // getting function selector from the first encoded parameter
    (bytes4 selector) = abi.decode(_data, (bytes4));

    // function selectors white list
    if (selector == this.methodA.selector) {
      // decoding different parameter types depending on the function selector

      // assuming the second encoded parameter is uint
      (, uint uintValue) = abi.decode(_data, (bytes4, uint256));
      methodA(_sender, _amount, uintValue);

    } else if (selector == this.methodB.selector) {
      // assuming the second encoded parameter is bytes3
      (, bytes3 bytes3Value) = abi.decode(_data, (bytes4, bytes3));
      methodB(_sender, _amount, bytes3Value);

    } else if (selector == this.methodC.selector) {
      // assuming the second encoded parameter is a string
      (, string memory stringValue) = abi.decode(_data, (bytes4, string));
      methodC(_sender, _amount, stringValue);

    } else {
      revert("Unknown function call");
    }
    return this.onTransferReceived.selector;
  }
}