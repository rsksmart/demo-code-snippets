// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

contract RestrictedAccess {
    event CalledByContract();
    event CalledByEoa();

    modifier eoaOnly() {
        require(msg.sender == tx.origin, 'EOA only!');
        _;
    }

    modifier contractOnly() {
        require(msg.sender != tx.origin, 'Smart contracts only!');
        _;
    }

    function callEoaOnly() public eoaOnly {
        emit CalledByEoa();
    }

    function callContractOnly() public contractOnly {
        emit CalledByContract();
    }
}

contract CallerContract {
    RestrictedAccess callee;

    constructor(RestrictedAccess _callee) {
        callee = _callee;
    }

    function verifyCallEoaOnly() public {
        callee.callEoaOnly();
    }

    function verifyCallContractOnly() public {
        callee.callContractOnly();
    }

}