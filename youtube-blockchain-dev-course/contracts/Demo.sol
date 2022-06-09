//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Demo {
  address public owner;
  // up to 3 indexed fields per event
  event Paid(address indexed _from, address indexed _to, uint _amount, uint _timestamp);

  modifier onlyOwner(address _to) {
    require(msg.sender == owner, "you are not the owner");
    // the same thing with another syntax
    if (_to == address(0)) {
      revert("incorrect address");
    }
    // also there is an `assert` func which rejects w/o a reason
    _;
  }

  constructor() {
    owner = msg.sender;
  }

  function pay() public payable {
    emit Paid(msg.sender, address(this), msg.value, block.timestamp);
  }

  function balance() public view returns(uint) {
    return address(this).balance;
  }

  function withdraw(address payable _to) external onlyOwner(_to) {
    _to.transfer(balance());
  } 

  // receives all money sent to the contract
  receive() external payable {
    pay();
  }

  // invokes when an unknown function is being called on the contract
  fallback() external payable {
    pay();
  }
}