/* eslint-disable import/no-extraneous-dependencies */
require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const minimumGasPriceTestnet = 65164000;
const TESTNET_GAS_MULT = 1;
const mnemonic = fs.readFileSync('.secret', 'utf8').toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('unable to retrieve mnemonic from .secret');
}

module.exports = {
  solidity: '0.7.3',
  // defaultNetwork: 'rskregtest',
  networks: {
    hardhat: {},
    rskregtest: {
      url: 'http://localhost:4444',
    },
    ganache: {
      url: 'http://127.0.0.1:7171',
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      gasPrice: Math.floor(minimumGasPriceTestnet * TESTNET_GAS_MULT),
      gasMultiplier: TESTNET_GAS_MULT,
      accounts: {
        // doesnt generate the correct address!!!!!!!
        mnemonic,
        initialIndex: 0,
        // if using RSK dPath
        // Ref: https://developers.rsk.co/rsk/architecture/account-based/#derivation-path-info
        path: "m/44'/37310'/0'/0",
        // if using Ethereum dPath (e.g. for Metamask compatibility)
        // path: "m/44'/60'/0'/0",
        count: 10,
      },
    },
  },
};
