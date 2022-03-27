# Using Hardhat (ethers-waffle) to test smart contracts on RKS

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

On RSK regtest:

```bash
npm run regtest
```

On RSK testnet:

```bash
npm run testnet
```
