# How to deploy collectible NFTs to RSK

## Steps

- Switch to Node.js 12 for Hardhat to work
```
nvm use 12
```

- [Install Hardhat](https://hardhat.org/getting-started/#installation)
```
npm install --save-dev hardhat
```
- Run Hardhat and `Create a sample project`
```
npx hardhat
```
- Replace all `contracts` folder contents with `Meow.sol` (delete all the rest).

- Delete `test` folder (we won't need it here)

- Replace `hardhat.config.js` with the one from this project

- Rename `template.secret.json` to `.secret.json` and put there your account mnemonic phrase. This is necessary to be able to deploy Meow-NFT s/c to RSK testnet or mainnet

- [Pinata](https://app.pinata.cloud/) is an IPFS cloud gateway. Create an acount and upload the images of future NFTs. Save the image CIDs

- create metadata for the NFTs. See the JSON examples in `nft-metadata` folder. Put your image CIDs to the JSON `image` property

- upload JSON metadata files to Pinata and save their CIDs. Paste these CIDs into the file `hardhat.config.js` to the `mint` task

- compile Meow-NFT smart contract
```bash
npx hardhat compile
```

- deploy Meow-NFT smart contract to RSK testnet. See other possible networks in `hardhat.config.js`
```bash
npx hardhat deploy --network rsktestnet
```
you will see a message 
```
Meow NFT deployed to: 0xE360F4BFb74A1B2B1d102f40BE6c7D0f5C9d12C8
Copy this address and paste to the 'mint' task in 'hardhat.config.js'
```
do what it asks: paste the address to the `mint` task!

- mint your NFTs from CIDs specified in the `mint` task of `project.config.js`
```bash
npx hardhat mint --network rsktestnet
```