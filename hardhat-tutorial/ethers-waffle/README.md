I encounter 2 problems while testing smart contracts with Hardhat

1. I can't send transactions via ether.js to a function of a smart contract deployed on RSK regtest. However the same transactions work on ganache or hardhat test networks. 
2. Mnemonic phrase produces "wrong" address 

To reproduce:

## Setup up environment (mac):
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
nvm install 12
nvm use 12
nvm alias default 12
npm install npm --global # Upgrade npm to the latest version
```
## Hardhat and project setup
```bash
npm install
```
## Run Hardhat tests
On Hardhat network:

```bash
npm run hardhat
```
Tests pass.

On Ganche network:

```bash
npm run ganache
```
Tests pass.

On RSK regtest network:

```bash
npm run regtest
```
Tests fail.

If I try to run the same test on RSK testnet:

```bash
npm run testnet
```
Hardhat generates wrong addresses from the mnemonic, and the test fails
with an error saing 
`ProviderError: the sender account doesn't exist`