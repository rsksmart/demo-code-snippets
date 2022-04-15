# Listening to smart contract events from a frontend DApp via Ethers.js

## Setup up environment for Hardhat (mac):
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
nvm install 12
nvm use 12
nvm alias default 12
npm install npm --global # Upgrade npm to the latest version
```
## RSK local node installation
[Follow instructions on the RSK Devportal](https://developers.rsk.co/quick-start/step1-install-rsk-local-node/)

## Hardhat setup
```bash
cd block-hardhat
npm install
```
## Provide a mnemonic phrase for RSK testnet deployment
Create a file `.secret` in the `block-hardhat` folder and put there your test account mnemonic phrase, consisting of 12 English words.

## Compile and deploy smart contract(s)
In the `block-hardhat` folder run one of the following scripts depending on your testing network
```bash
npm run deploy:hardhat
npm run deploy:regtest
npm run deploy:testnet
npm run deploy:ganache
```
This will compile a test token (Meow Token), deploy it to the selected network and
copy the deployed contract data to the frontend smart contracts folder `front/contracts`

## Run the DApp
Go to the frontend folder
```bash
cd ..
cd frontend
```
and run `index.html` in your browser with a `Live Server`
