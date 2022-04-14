import { useState } from 'react';
import { ethers } from 'ethers';

function useEthers(setErrorMessage, setLoading) {
  const [provider, setProvider] = useState(null);
  const enable = async () => {
    try {
      setLoading(true);
      setErrorMessage('');
      // ensure Metamask is installed
      if (!window.ethereum) throw new Error('You should enable Metamask');
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
      // MetaMask requires requesting permission to connect users accounts
      await ethersProvider.send('eth_requestAccounts', []);
      setProvider(ethersProvider);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  const disable = async () => setProvider(null);
  return { provider, enable, disable };
}

export default useEthers;
