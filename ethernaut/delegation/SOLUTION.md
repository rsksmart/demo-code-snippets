# Delegation challenge solution

To seize Delegation contract ownership, you need to call `pwn` function from Delegate in the context of the Delegation contract. 
You can do this by calling the `pwn` function on Delegation smart contract. Delegation does not contain a `pwn` function, so the `fallback` function will be called, which in turn will call `pwn` in the context of Delegation contract using `delegatecall`

See the details of the described method in `contracts/Exploit.sol` and `test/Delegation.test.ts`