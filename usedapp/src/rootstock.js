export const RootstockTestnet = {
  chainId: 31,
  chainName: 'Rootstock Testnet',
  isTestChain: true,
  isLocalChain: false,
  rpcUrl: 'https://public-node.testnet.rsk.co',
  multicallAddress: '0x9e469e1fc7fb4c5d17897b68eaf1afc9df39f103',
  nativeCurrency: {
    name: 'Test Rootstock Bitcoin',
    symbol: 'tRBTC',
    decimals: 18,
  },
  getExplorerAddressLink: () => '',
  getExplorerTransactionLink: () => '',
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

export const RootstockMainnet = {
  chainId: 30,
  chainName: 'Rootstock Mainnet',
  isTestChain: false,
  isLocalChain: false,
  rpcUrl: 'https://public-node.rsk.co',
  multicallAddress: '0x6c62bf5440de2cb157205b15c424bceb5c3368f5',
  nativeCurrency: {
    name: 'Rootstock Bitcoin',
    symbol: 'RBTC',
    decimals: 18,
  },
  getExplorerAddressLink: () => '',
  getExplorerTransactionLink: () => '',
};
