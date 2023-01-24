import { useState } from 'react';
import { ethers } from 'ethers';
import { MeowToken__factory, MeowToken } from './contracts/typechain-types';
import deployment from './contracts/MeowToken.rsktestnet.address.json';

function App() {
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');

  const connect = async () => {
    if (!window.ethereum) throw new Error('You need Metamask to run this app');
    await window.ethereum.request!({
      method: 'eth_requestAccounts',
    });
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    const [walletAddress] = await web3Provider.listAccounts();
    // instantiate MeowToken from TypeChain artifacts
    const meowToken: MeowToken = MeowToken__factory.connect(
      deployment.address,
      web3Provider,
    );
    const meowBalance = await meowToken.balanceOf(walletAddress);
    setBalance(meowBalance.toString());
    setAddress(walletAddress);
  };

  if (!address) return <button onClick={connect}>Connect Metamask</button>;
  return <div>
    <p>Address: {address}</p>
    <p>MeowToken balance: {balance}</p>
  </div>;
}

export default App;
