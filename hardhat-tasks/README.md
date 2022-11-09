# Creating a Hardhat task

This demo repo shows how to create `balance` Hardhat task which displays user's RBTC and token balances.
The task is defined in a file `tasks/balance.js` and connected to Hardhat in `hardhat.config.js`.
See the details of creating tasks in the [Hardhat documentation](https://hardhat.org/hardhat-runner/docs/advanced/create-task)

## Installation 
```shell
npm install
```

## Usage

- to display RBTC balance of the default signer:
```shell
npx hardhat balance
```
- to display RBTC balance at a specific address:
 ```shell
npx hardhat balance --wallet 0xb42c26BB804987EE7FEFb897eB18ED775da19Fe4
```
Some of the RSK deployed tokens are listed in `deployed-tokens.json`

- to display RBTC and token balances of the default signer:
```shell
npx hardhat balance --token RIF
npx hardhat balance --token RDOC
```
- to display RBTC and token balances at a specific address:
```shell
npx hardhat balance --token RIF --wallet 0xb42c26BB804987EE7FEFb897eB18ED775da19Fe4
npx hardhat balance --token RDOC --wallet 0xb42c26BB804987EE7FEFb897eB18ED775da19Fe4
```
