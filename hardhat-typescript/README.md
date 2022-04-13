# Using Hardhat + TypeScript + TypeChain to test and deploy smart contracts on RSK regtest

## Setup up environment (mac):
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
nvm install 12
nvm use 12
nvm alias default 12
npm install npm --global # Upgrade npm to the latest version
```
## RSK local node installation
[Follow instructions on the RSK Devportal](https://developers.rsk.co/quick-start/step1-install-rsk-local-node/)

## Hardhat, TypeScript, TypeChain and project setup
```bash
npm install
```

## Compile smart contracts
```bash
npm run compile
```

## Deploy smart contracts

### On RSK regtest
```bash
npm run deploy
```
### On Hardhat
```bash
npm run deploy:hardhat
```

## Test smart contracts

### On RSK regtest
```bash
npm run test
```
### On Hardhat
```bash
npm run test:hardhat
```

## Clean generated Hardhat artifacts and TypeChain types
```bash
npm run clean
```