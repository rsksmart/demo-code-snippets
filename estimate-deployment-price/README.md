# How to estimate a smart contract deployment price on RSK before the actual deployment

## Project setup
```bash
nvm use 12
npm install
npx hardhat compile
```

## RSK local node installation
[Follow instructions on the RSK Devportal](https://developers.rsk.co/quick-start/step1-install-rsk-local-node/)

## Provide a mnemonic phrase for RSK testnet/mainnet deployment
In the project root folder rename the file `.template.secret.json` to `.secret.json`  and put there your test account mnemonic phrase, consisting of 12 English words.

## Run tests
See the available networks in `hardhat.config.js`
```bash
npx hardhat test --network rskregtest
```

## Deploy smart contracts to RSK
The deployment task (see `hardhat.config.js`)  will estimate the deployment price, check deployer's balance and ask the deployer if he wants to proceed with the deployment by that price. See the available networks in `hardhat.config.js`
```bash
npx hardhat deploy --network rskmainnet
```