# GateKeeper solution

1. To pass through the first gate, the caller has to be a smart contract. When a smart contract calls another smart contract, the `msg.sender` value changes to the address of the calling contract, whereas `tx.origin` remains the address of externally owned account. Thus we need to call `enter` from an intermediary smart contract.
2. However to pass the second gate this contract lenght should equal zero. This is achievable if the smart contract consists only of a constructor, and we will call the `enter` function directly from the constructor.
3. In the third gate `^` means XOR, or Exclusive or. If we apply the XOR operation in reverse order, we get the required gate key.

- `contracts/Exploit.sol` - intermediary smart contract
- `test/GateKeeper.test.ts` - testing the solution