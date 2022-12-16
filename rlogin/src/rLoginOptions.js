import WalletConnectProvider from '@walletconnect/web3-provider';

const rskChains = [
  {
    name: 'Rootstock Mainnet',
    chainId: 30,
    rpcUrl: 'https://public-node.rsk.co',
    explorerUrl: 'https://explorer.rsk.co',
  },
  {
    name: 'Rootstock Testnet',
    chainId: 31,
    rpcUrl: 'https://public-node.testnet.rsk.co',
    explorerUrl: 'https://explorer.testnet.rsk.co',
  },
];

const rLoginOptions = {
  cachedProvider: false, // change to true to cache user's wallet choice
  providerOptions: {
    // read more about providers setup in https://github.com/web3Modal/web3modal/
    walletconnect: {
      // setup wallet connect for mobile wallet support
      package: WalletConnectProvider,
      options: {
        // object looking like: { 30: 'https://...', 31: 'http...', ... }
        rpc: rskChains.reduce(
          (prev, chain) => ({
            ...prev,
            [chain.chainId]: chain.rpcUrl,
          }),
          {},
        ),
      },
    },
  },
  // enable all available Rootstock networks
  supportedChains: rskChains.map((chain) => chain.chainId),
};

export default rLoginOptions;
