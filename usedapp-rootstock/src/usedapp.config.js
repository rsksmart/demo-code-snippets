// NOTE this import is the significant one for this demo
import { RootstockMainnet, RootstockTestnet } from '@usedapp/core';

/** @type import('@usedapp/core').Config */
const dappConfig = {
  networks: [RootstockMainnet, RootstockTestnet],
  readOnlyChainId: RootstockMainnet.chainId,
  readOnlyUrls: {
    [RootstockMainnet.chainId]: RootstockMainnet.rpcUrl,
    [RootstockTestnet.chainId]: RootstockTestnet.rpcUrl,
  },
};

export default dappConfig;
