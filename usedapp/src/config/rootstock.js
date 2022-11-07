import { getAddressLink, getTransactionLink } from '../utils';

// Rootstock networks configuration
// List of other available networks:
// https://github.com/TrueFiEng/useDApp/tree/master/packages/core/src/model/chain

const rootstockTestnetExplorerUrl = 'https://explorer.testnet.rsk.co/';

export const RootstockTestnet = {
  chainId: 31,
  chainName: 'Rootstock Testnet',
  isTestChain: true,
  isLocalChain: false,
  rpcUrl: 'https://public-node.testnet.rsk.co',
  // Multicall3 smart contract https://github.com/mds1/multicall
  // deployed at https://explorer.testnet.rsk.co/address/0xca11bde05977b3631167028862be2a173976ca11
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  nativeCurrency: {
    name: 'Test Rootstock Bitcoin',
    symbol: 'tRBTC',
    decimals: 18,
  },
  getExplorerAddressLink: getAddressLink(rootstockTestnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(rootstockTestnetExplorerUrl),
};

const rootstockMainnetExplorerUrl = 'https://explorer.rsk.co/';

export const RootstockMainnet = {
  chainId: 30,
  chainName: 'Rootstock Mainnet',
  isTestChain: false,
  isLocalChain: false,
  rpcUrl: 'https://public-node.rsk.co',
  // Multicall3 smart contract https://github.com/mds1/multicall
  // deployed at https://explorer.rsk.co/address/0xca11bde05977b3631167028862be2a173976ca11
  multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
  nativeCurrency: {
    name: 'Rootstock Bitcoin',
    symbol: 'RBTC',
    decimals: 18,
  },
  getExplorerAddressLink: getAddressLink(rootstockMainnetExplorerUrl),
  getExplorerTransactionLink: getTransactionLink(rootstockMainnetExplorerUrl),
};

export const RootstockRegtest = {
  chainId: 33,
  chainName: 'Rootstock Regtest',
  isTestChain: true,
  isLocalChain: true,
  rpcUrl: 'http://localhost:4444',
  multicallAddress: '',
  nativeCurrency: {
    name: 'Test Rootstock Bitcoin',
    symbol: 'tRBTC',
    decimals: 18,
  },
  getExplorerAddressLink: () => '',
  getExplorerTransactionLink: () => '',
};
