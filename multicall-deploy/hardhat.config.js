require('@nomicfoundation/hardhat-toolbox');

const { mnemonic } = require('../.secret.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
      {
        version: '0.8.17',
        settings: {
          optimizer: { enabled: true, runs: 200 },
        },
      },
    ],
  },
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
