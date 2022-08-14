# CREATE and CREATE2

This project demonstrates how to calculate the smart contract address before the actual deployment on RSK using [CREATE2](https://eips.ethereum.org/EIPS/eip-1014) schemes.

- Test 1 demostrates the address calculation in a standard way
- Test 2 shows the CREATE2 method. It selects the salt in such a way that the future address will start with 4 leading zeros

```shell
nvm use 18
npm install
npx hardhat test --network rsktestnet
```
The test outputs
```
  Calculate address
'ContractFactory' was deployed on rsktestnet with address 0xc3417e16e59a9b67AE577F1e8315EC91B1350204
    ✔ Should predict Child address (90881ms)
    ✔ Should deploy Child to the address starting with four zeros (83643ms)

    Picked up a salt '0x02b170d84f848d2b6ac490e51f96c9d225cd79a0a392e03981ad42260e17507f' such that the deployed s/c address is 0x00009DD0dE4f46153821dbF8c0ab3B18F99f0467
```