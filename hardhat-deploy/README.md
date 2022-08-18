# Hardhat plugin deploy

This project demonstrates how to make use of [hardhat-deploy](https://www.npmjs.com/package/hardhat-deploy) Hardhat plugin in order to: 
- deploy 2 smart contracts sequentially to Hardhat / RSK testnet
- call a function on the smart smart contract right after the deployment
- test smart contracts using deployment fixture


## Installation
Rename `.template.secret.json` from the repo root to `.secret.json` and put there your accounts seed phrase

```shell
nvm use 18
npm install
```
## Deployment
```shell
npx hardhat deploy --network hardhat
npx hardhat deploy --network rsktestnet
```
## Testing
```shell
npx hardhat test
```