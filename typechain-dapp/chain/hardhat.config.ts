import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { mnemonic } from '../../.secret.json';
import './tasks/deploy';

const accounts = {
  mnemonic,
  path: "m/44'/60'/0'/0",
};

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    },
  },
  networks: {
    hardhat: {
      accounts,
    },
    localhost: {
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

export default config;
