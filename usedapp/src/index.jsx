import React from 'react';
import ReactDOM from 'react-dom';
import { ethers } from 'ethers';

import {
  DAppProvider,
  useEtherBalance,
  useEthers,
  Mainnet,
} from '@usedapp/core';
import { RootstockTestnet } from './rootstock';
import MetamaskConnect from './components/MetamaskConnect';

/* const config = {
  readOnlyChainId: RootstockRegtest.chainId,
  readOnlyUrls: {
    [RootstockRegtest.chainId]: RootstockRegtest.rpcUrl,
  },
}; */

/* const config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: ethers.getDefaultProvider('mainnet'),
  },
}; */

const config = {
  readOnlyChainId: RootstockTestnet.chainId,
  readOnlyUrls: {
    [RootstockTestnet.chainId]: RootstockTestnet.rpcUrl,
  },
};

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root'),
);

function App() {
  const { account, deactivate, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  console.log(chainId, config.readOnlyUrls[chainId]);

  /*   if (!config.readOnlyUrls[chainId]) {
    return <p>Please use Rootstock Testnet.</p>;
  } */

  return (
    <div>
      <MetamaskConnect />
      {account && (
        <button type="button" onClick={() => deactivate()}>
          Disconnect
        </button>
      )}
      {etherBalance && (
        <div className="balance">
          <br />
          Balance:
          <p className="bold">{etherBalance.toString()}</p>
        </div>
      )}
    </div>
  );
}
