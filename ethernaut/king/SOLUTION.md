# Solution

To hack the game and remain king forever, the attacker has to:

- deploy Exploit smart contract without `receive` function or having one but reverting, as shown in `Exploit.sol`
- from the Exploit smart contract transfer to the King smart contract an amount of RBTC slightly larger (say, by 1 wei) than the prize. Thus Exploit becomes king.

After Exploit once seizes the throne, it will forever remain king because all subsequent King smart contract payments will be reverted whenever anyone will try to transfer a larger RBTC amount to it. That's because King's `receive` will always try to transfer RBTC to Exploit which reverts every RBTC transfer.

See details in `test/King.exploit.test.ts`