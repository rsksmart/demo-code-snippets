# Solution

There are at least two cases when any address (including a smart contract) will never refuse to accept RBTC:

- mining reward
- `selfdestruct(address payable)` operation, which destroys the current smart contract and transfers the money from its balance to the specified address.

To transfer money to a smart contract that does not have a `receive` function, send it money through the `selfdestruct` function, as shown in `contracts/Exploit.sol`.

See test cases in `test/Meow.exploit.test.ts`
