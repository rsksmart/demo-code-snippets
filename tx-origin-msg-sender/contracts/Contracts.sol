// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract Callee {
    string message;

    event CalledByContract(string functionName);
    event CalledByEoa(string functionName);

    function _hasExtCode() private view returns (bool) {
        uint32 size;
        address sender = msg.sender;
        assembly {
            size := extcodesize(sender)
        }
        return (size > 0);
    }

    // should be called only by EOA. verify by tx.origin
    function verifyEoaCallOrigin() public {
        require(
            msg.sender == tx.origin,
            'EOA only! tx.origin should equal msg.sender'
        );
        message = "exploited";
        emit CalledByEoa('verifyEoaCallOrigin');
    }

    // should be called only by EOA. verify by ext code size
    function verifyEoaCallExtCode() public {
        require(
            !_hasExtCode(),
            'EOA only! EOA should not have ext code, but you have'
        );
        emit CalledByEoa('verifyEoaCallExtCode');
    }

    // should be called only by contracts. verify by tx.origin
    function verifyContractCallOrigin() public {
        require(
            msg.sender != tx.origin,
            'Smart contracts only! tx.origin should not equal msg.sender'
        );
        emit CalledByContract('verifyContractCallOrigin');
    }

    // should be called only by contracts. verify by ext code size
    function verifyContractCallExtCode() public {
        require(
            _hasExtCode(),
            'Smart contracts only! You dont have an external code but you should'
        );
        emit CalledByContract('verifyContractCallExtCode');
    }
}

contract Caller {
    Callee callee;

    constructor(Callee _callee) {
        callee = _callee;
    }

    // should succeed
    function contractCallExtCode() external {
        callee.verifyContractCallExtCode();
    }

    // should succeed
    function contractCallOrigin() external {
        callee.verifyContractCallOrigin();
    }

    // should fail
    function eoaCallExtCode() external {
        callee.verifyEoaCallExtCode();
    }

    // should fail
    function eoaCallOrigin() external {
        callee.verifyEoaCallOrigin();
    }
}

contract Exploit1 {
    event Foo();

    constructor(Callee _callee) {
        emit Foo();
        // here smart contract doesn't have code yet
        // and it's possible to call a EOA only function
        _callee.verifyEoaCallExtCode();
    }
}

contract Exploit2 {
    constructor(Callee _callee) {
        // here smart contract doesn't have code yet
        // but tx.origin check still protects from calling EOA only function
        _callee.verifyEoaCallOrigin();
    }
}
