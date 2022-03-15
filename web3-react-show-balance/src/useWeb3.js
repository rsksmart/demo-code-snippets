import { useState } from 'react';
import Web3 from 'web3';

// it's convenient to move metamask/web3 connection code to a separate custom hook
function useWeb3(setIsLoading, setErrorMessage) {
  // web3 instance
  const [provider, setProvider] = useState(null);
  // active account
  const [account, setAccount] = useState('');
  // connect this function to a button click event
  const connect = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      // ensure Metamask is installed
      if (!window.ethereum) throw new Error('You should enable Metamask');
      // show Metamask prompt
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // connect Metamask to web3.js and get a web3 provider instance
      const web3 = new Web3(window.ethereum);
      setProvider(web3);
      // refresh account on change
      window.ethereum.on('accountsChanged', (accounts) =>
        setAccount(accounts[0]),
      );
      // retrieve Metamask accounts from web3
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // connect this function to a disconnect button
  const disconnect = () => {
    setProvider(null);
    setAccount('');
  };
  return { connect, disconnect, provider, account };
}

export default useWeb3;
