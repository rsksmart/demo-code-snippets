# Recovery solution

> They have since lost the contract address.
> This level will be completed if you can recover (or remove) the 0.001 ether from the lost contract address.

1. Use [getContractAddress](https://docs.ethers.org/v5/api/utils/address/#utils-getContractAddress) to calculate an address of the first deployed Simple token assuming nonce to equal 1.

2. Use Simple token's `destroy` function to transfer its RBTC to any address

See how it works in `test/Recovery.test.ts`