# Disassembling EVM/RVM opcodes

This project demonstrates how to convert compiled bytecode string to EVM/RVM opcodes with [@ethersproject/asm](https://www.npmjs.com/package/@ethersproject/asm) module which is a part of [Ethers.js](https://docs.ethers.org/v5/) library. 
See the examples in `test/basicToken.test.ts`
See the [module's documentation](https://docs.ethers.org/v5/api/other/assembly/api/#asm-utilities--disassembler) for details on usage.

```shell
npm install
npx hardhat compile
npm test
```
