require('@nomiclabs/hardhat-waffle');
const { mnemonic } = require('../.secret.json');

module.exports = {
  solidity: '0.8.4',
  defaultNetwork: 'hardhat',
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
  },
};
