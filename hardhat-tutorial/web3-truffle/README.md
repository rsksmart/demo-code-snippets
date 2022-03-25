# Using Hardhat to test smart contracts on RSK Regtest network
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
## Run tests on RSK regtest network

```bash
npm run test
```
