import { RootstockTestnet, RootstockMainnet } from './rootstock';

// useDapp configuration. See details at:
// https://usedapp-docs.netlify.app/docs/API%20Reference/Models#config

const dAppConfig = {
  networks: [RootstockTestnet, RootstockMainnet],
  readOnlyChainId: RootstockMainnet.chainId,
  readOnlyUrls: {
    [RootstockTestnet.chainId]: RootstockTestnet.rpcUrl,
    [RootstockMainnet.chainId]: RootstockMainnet.rpcUrl,
  },
};

export default dAppConfig;
