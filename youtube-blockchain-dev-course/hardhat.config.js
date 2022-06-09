require('@nomiclabs/hardhat-waffle');
const { mnemonic } = require('./.secret.json');

module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'rskregtest',
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7171',
    },
    rskregtest: {
      chainId: 33,
      url: 'http://localhost:4444',
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/HUq9ZJ3gpqFA-_3-GP7hyZGilSk1pZDd`,
      chainId: 3,
      accounts: {
        mnemonic,
      },
    },
  },
  mocha: {
    timeout: 6000000,
  },
};
