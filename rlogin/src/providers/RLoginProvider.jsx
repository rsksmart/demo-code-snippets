import { useState } from 'react';
import RLogin from '@rsksmart/rlogin';
import WalletConnectProvider from '@walletconnect/web3-provider';
import RLoginContext from '../contexts/rLoginContext';
import { rskTestnet } from '../rskConfig';

const rLogin = new RLogin({
  cachedProvider: false, // change to true to cache user's wallet choice
  providerOptions: {
    // read more about providers setup in https://github.com/web3Modal/web3modal/
    walletconnect: {
      package: WalletConnectProvider, // setup wallet connect for mobile wallet support
      options: {
        rpc: {
          [rskTestnet.chainId]: rskTestnet.rpcUrl,
        },
      },
    },
  },
  supportedChains: [rskTestnet.chainId], // enable rsk testnet network
});

function RLoginProvider({ children }) {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [loadingStatus, setLoadingStatus] = useState('');

  // error and loading handler
  const tryRequest = async (message, request) => {
    try {
      setErrorMessage('');
      setLoadingStatus(message);
      await request();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoadingStatus('');
    }
  };

  // connect to Metamask via rLogin
  const connect = () => {
    tryRequest('Connecting to web3 provider', async () => {
      const web3Provider = (await rLogin.connect()).provider;
      setProvider(web3Provider);
      const [walletAddress] = await web3Provider.request({
        method: 'eth_accounts',
      });
      setAccount(walletAddress);
    });
  };

  const rLoginContextValue = {
    provider,
    account,
    connect,
    tryRequest,
    errorMessage,
    loadingStatus,
  };

  return (
    <RLoginContext.Provider value={rLoginContextValue}>
      {children}
    </RLoginContext.Provider>
  );
}

export default RLoginProvider;
