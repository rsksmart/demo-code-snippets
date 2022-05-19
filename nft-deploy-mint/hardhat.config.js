/* eslint-disable no-undef */
require('@nomiclabs/hardhat-waffle');

// don't forget to rename `template.secret.json` to `.secret.json`
// and put there your mnemonic phrase
const { mnemonic } = require('./.secret.json');

// run `npx hardhat deploy` to deploy your smart contract
task('deploy', 'Deploys smart contract to a blockchain').setAction(async () => {
  // get a contract factory of the compiled s/c
  const meowContractFactory = await ethers.getContractFactory('Meow');
  // send a deploy transaction
  const meowNft = await meowContractFactory.deploy();
  // wait for the tx to be mined
  await meowNft.deployed();
  console.log(
    `Meow NFT deployed to: ${meowNft.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`,
  );
});

// run `npx hardhat mint` to mint new NFTs
task('mint', 'Mint new NFT collectibles').setAction(async () => {
  // first run `npx hardhat deploy`, copy an address of the
  // deployed s/c and paste it here
  const deployedAddress = '0xE360F4BFb74A1B2B1d102f40BE6c7D0f5C9d12C8';
  // put your NFT metadata JSON file IPFS CIDs (from Pinata) to this array
  const newCIDsToMint = [
    'QmaXZxVGYcCY36seYTVuGeY9mWchC1WjMscV1FLNfZsM3f',
    'QmR5mspowKw6B68QPSuYE9SGH1A6gPKxjdVRokhAZZh4LD',
  ];
  // get smart contract Application Programming Interface
  const api = (await ethers.getContractFactory('Meow')).interface;
  // get your (deployer, signer) account information (address etc)
  const [signer] = await ethers.getSigners();
  // instantiate a smart contract representation object
  const meowNft = new ethers.Contract(deployedAddress, api, signer);
  // mints all items from the `newCIDsToMint` array one after another (one by one)
  async function mintSequentially() {
    // Remove the first CID from the `newCIDsToMint` array.
    // If the array is already empty (minted all items)
    // it will return `undefined` and the function recursive call
    // will be finished
    const cid = newCIDsToMint.shift();
    // if there is still an item left to be minted
    if (cid) {
      // call smart contract's `mintNFT` function, initiating a transaction
      const tx = await meowNft.mintNFT(signer.address, `ipfs://${cid}`);
      // wait for the transaction to be mined and get a tx receipt
      const receipt = await tx.wait();
      // extract an ID of newly minted NFT from the `Transfer` event
      // emitted by the smart contract
      const { tokenId } = receipt.events[0].args;
      console.log(`Minted NFT ${deployedAddress} #${tokenId}`);
      // recursively calls itself until `newCIDsToMint` array is empty
      await mintSequentially();
    }
  }
  // initiate the minting
  await mintSequentially();
});

module.exports = {
  solidity: '0.8.12',
  defaultNetwork: 'rsktestnet',
  networks: {
    hardhat: {},
    rskregtest: {
      url: 'http://localhost:4444',
      chainId: 33,
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    rskmainnet: {
      chainId: 30,
      url: 'https://public-node.rsk.co',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
  },
};
