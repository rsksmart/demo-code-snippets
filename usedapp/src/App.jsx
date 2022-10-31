import './App.css';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { utils } from 'ethers';
import dAppConfig from './dAppConfig';
import MetamaskConnect from './components/MetamaskConnect';

function App() {
  const { account, deactivate, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  /*   if (!dAppConfig.readOnlyUrls[chainId]) {
    return <p>Please use either Mainnet or Goerli testnet.</p>;
  } */
  console.log(chainId);
  return (
    <div>
      <MetamaskConnect />
      {account && (
        <button type="button" onClick={() => deactivate()}>
          Disconnect
        </button>
      )}
      <div className="balance">
        <br />
        Balance:
        <p className="bold">{etherBalance ?? '?'}</p>
      </div>
    </div>
  );
}

export default App;
