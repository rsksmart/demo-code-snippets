import { useEthers } from '@usedapp/core';
import PageContainer from './components/PageContainer';
import Connect from './components/Connect';
import SwitchNetwork from './components/SwitchNetwork';
import Dashboard from './components/Dashboard';
import SendRbtc from './components/SendRbtc';
import dappConfig from './usedapp.config';

function App() {
  const { account, chainId } = useEthers();

  return (
    <PageContainer>
      {!account ? (
        <Connect />
      ) : (
        <>
          {!dappConfig.readOnlyUrls[chainId] ? (
            <SwitchNetwork />
          ) : (
            <>
              <Dashboard />
              <SendRbtc />
            </>
          )}
        </>
      )}
    </PageContainer>
  );
}

export default App;
