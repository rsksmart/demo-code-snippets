# Location of constructor arguments in a smart contract deployment bytecode

The bytecode of smart contracts with the same Solidity code and compiler settings may differ. The difference may be in the constructor arguments passed during deployment. Constructor arguments are located at the end of the bytecode and have a length corresponding to their data type. In case of simple types (uint8-256, bytes3-32, string, address) the argument occupies the last 32 bytes of the bytecode (64 characters).

In this repository we compile `BasicToken` with different constructor arguments (see `test/basic-token.test.ts`). The compiled bytecodes differ only in the values of these arguments.

To run the tests:
```shell
npm install
npx hardhat compile
npx hardhat test test/basic-token.test.ts
```