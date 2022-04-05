/* eslint-disable import/no-extraneous-dependencies */

// ethers-waffle preset
// https://hardhat.org/guides/waffle-testing.html
require('@nomiclabs/hardhat-waffle');
const fs = require('fs');
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const minimumGasPriceTestnet = 65164000;
const TESTNET_GAS_MULT = 1;
const mnemonic = fs.readFileSync('.secret', 'utf8').toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('Put mnemonic phrase in a file ".secret"');
}

module.exports = {
  solidity: '0.7.3',
  defaultNetwork: 'rsktestnet',
  networks: {
    hardhat: {},
    rskregtest: {
      url: 'http://localhost:4444',
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      gasPrice: Math.floor(minimumGasPriceTestnet * TESTNET_GAS_MULT),
      gasMultiplier: TESTNET_GAS_MULT,
      accounts: {
        mnemonic,
        initialIndex: 0,
        // if using RSK dPath
        // Ref: https://developers.rsk.co/rsk/architecture/account-based/#derivation-path-info
        // path: "m/44'/37310'/0'/0",
        // if using Ethereum dPath (e.g. for Metamask compatibility)
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
