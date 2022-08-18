# ERC1363 Payable token

This project demonstrates how to:
- create ERC1363 payable token
- create ERC1363Receiver smart contract
- encode receiver function selectors with `ethers.js`
- call receiver functions through token's `transferAndCall` function
- decode call data in receiver's `onTransferReceived` function
- pass parameters of different types to different receiver functions
- test the events emitted by the appropriate receiver functions

Install:

```shell
npm install
```
Test:
```shell
npx hardhat test
```