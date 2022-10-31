import { Goerli } from '@usedapp/core';
import { RootstockTestnet } from './rootstock';

/* const dAppConfig = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: Goerli.rpcUrl,
  },
}; */

const dAppConfig = {
  readOnlyChainId: RootstockTestnet.chainId,
  readOnlyUrls: {
    [RootstockTestnet.chainId]: RootstockTestnet.rpcUrl,
  },
  ...RootstockTestnet,
};

export default dAppConfig;
