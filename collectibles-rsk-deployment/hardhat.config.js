/* eslint-disable no-undef */
require('@nomiclabs/hardhat-waffle');
const mnemonic = require('./utils').readMnemonic();
const { deployContracts, writeDeployments, mintNfts } = require('./utils');

const minimumGasPriceTestnet = 65164000;
const TESTNET_GAS_MULT = 1;

task('deploy', 'Deploys smart contract to a blockchain').setAction(async () => {
  const meowNft = await deployContracts();
  await writeDeployments(meowNft.address);

  console.log('Meow NFT deployed to:', meowNft.address);
});

// items to mint are specified in 'project.config.js'
task('mint', 'Mint new NFT collectibles').setAction(async () => {
  await mintNfts();
});

module.exports = {
  solidity: '0.8.12',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://localhost:7171',
    },
    rskregtest: {
      url: 'http://localhost:4444',
      chainId: 33,
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      gasPrice: Math.floor(minimumGasPriceTestnet * TESTNET_GAS_MULT),
      gasMultiplier: TESTNET_GAS_MULT,
      accounts: {
        mnemonic,
        initialIndex: 0,
        path: "m/44'/60'/0'/0",
        count: 10,
      },
    },
  },
  mocha: {
    // 10 minutes
    timeout: 600000,
  },
};
