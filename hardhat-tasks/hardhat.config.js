require('@nomicfoundation/hardhat-toolbox');
const { mnemonic } = require('../.secret.json');

// balance task
require('./tasks/balance.js');

const accounts = {
  mnemonic,
  path: "m/44'/60'/0'/0",
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.16',
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
  },
  defaultNetwork: 'rsktestnet',
  networks: {
    hardhat: {
      accounts,
    },
    rskregtest: {
      chainId: 33,
      url: 'http://localhost:4444',
      accounts: 'remote',
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      accounts,
    },
    rskmainnet: {
      chainId: 30,
      url: 'https://public-node.rsk.co/',
      accounts,
    },
  },
};
