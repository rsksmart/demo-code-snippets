// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Recovery {
    event TokenCreated(address tokenAddress);

    //generate tokens
    function generateToken(string memory _name, uint256 _initialSupply) public {
        SimpleToken newToken = new SimpleToken(
            _name,
            msg.sender,
            _initialSupply
        );
        emit TokenCreated(address(newToken));
    }
}

contract SimpleToken {
    string public name;
    mapping(address => uint) public balances;

    // constructor
    constructor(string memory _name, address _creator, uint256 _initialSupply) {
        name = _name;
        balances[_creator] = _initialSupply;
    }

    // collect ether in return for tokens
    receive() external payable {
        balances[msg.sender] = msg.value * 10;
    }

    // allow transfers of tokens
    function transfer(address _to, uint _amount) public {
        require(balances[msg.sender] >= _amount);
        balances[msg.sender] = balances[msg.sender] - _amount;
        balances[_to] = _amount;
    }

    // clean up after ourselves
    function destroy(address payable _to) public {
        selfdestruct(_to);
    }
}
