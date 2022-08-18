require('@nomicfoundation/hardhat-toolbox');
const { mnemonic } = require('../.secret.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.9',

  networks: {
    hardhat: {},
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
  },
  mocha: {
    timeout: 600000,
  },
};
