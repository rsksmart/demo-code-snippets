# How to deploy collectible NFTs to RSK

- [Pinata](https://app.pinata.cloud/) is an IPFS cloud gateway. Create an acount and upload the images of future NFTs. Remember the image CIDs
- create metadata for the NFTs. See the JSON examples in `nft-metadata` folder. Put your image CIDs to the JSON `image` property
- upload JSON metadata files to Pinata and store their CIDs. Paste these CIDs into a file `project.config.js` to `newCIDsToMint` property
- switch to node.js 12 and install Hardhat and the project
```bash
nvm use 12
npm install
```
- create a file `.secret` in the project root and put there your account mnemonic phrase. This is necessary to be able to deploy Meow-NFT s/c to RSK testnet or mainnet
- compile Meow-NFT smart contract
```bash
npx hardhat compile
```
- you can run the test from `test/Meow.js` by running 
```bash
npx hardhat test
```
- deploy Meow-NFT smart contract to RSK testnet. See other possible networks in `hardhat.config.js`
```bash
npx hardhat deploy --network rsktestnet
```
- mint your NFTs from CIDs specified in `project.config.js`
```bash
npx hardhat mint --network rsktestnet
```