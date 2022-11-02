import { useState } from 'react';
import { ethers } from 'ethers';
import { providers } from '@0xsequence/multicall';
import RifToken from './RIFToken.json';

/* const WALLET_ADDRESS = '0xb42c26BB804987EE7FEFb897eB18ED775da19Fe4';
const tRIF_ADDRESS = '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE';

const configRskTestnet = {
  rpcUrl: 'https://public-node.testnet.rsk.co',
  multicallAddress: '0x9e469e1fc7fb4c5d17897b68eaf1afc9df39f103',
};

const configRskMainnet = {
  rpcUrl: 'https://public-node.rsk.co',
  multicallAddress: '0x6c62bf5440de2cb157205b15c424bceb5c3368f5',
}; */

const multicallConf = {
  // RSK Testnet
  31: {
    batchSize: 50, // maximum number of calls to batch into a single JSON-RPC call
    timeWindow: 50, // defines the time each call is held on buffer waiting for subsequent calls before aggregation, ms
    contract: '0xb39d1Dea1bF91Aef02484F677925904b9d6936B4', // Multicall deployed at RSK Testnet https://explorer.testnet.rsk.co/address/0xb39d1dea1bf91aef02484f677925904b9d6936b4?__ctab=Code
  },
};

function App() {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState(null);

  const [dashboard, setDashboard] = useState({
    rbtcBalance: 0,
    rifBalance: 0,
    rifDecimals: 0,
    rifTotalSupply: 0,
  });

  const connect = async () => {
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await web3Provider.getNetwork();
      const config = multicallConf[chainId];
      if (!config)
        throw new Error(`Unknown multicall config for the chain ${chainId}`);
      const multicallProvider = new providers.MulticallProvider(
        web3Provider,
        config,
      );
      const addresses = await web3Provider.listAccounts();
      setAddress(addresses[0]);
      setProvider(web3Provider);
    } catch (error) {
      console.error(error.message);
    }
  };

  const watchBalances = async () => {
    try {
      // connect RIF token
      const rifToken = new ethers.Contract(
        RifToken.address.toLowerCase(),
        RifToken.abi,
        provider,
      );
      // create aggregated call
      const aggregatedCall = [
        provider.getBalance(address),
        rifToken.balanceOf(address),
        rifToken.decimals(),
        rifToken.totalSupply(),
      ];
      const callResult = await Promise.all(aggregatedCall);
      setDashboard({
        rbtcBalance: ethers.utils.formatEther(callResult[0]),
        rifBalance: callResult[1].div(
          ethers.BigNumber.from(10).pow(callResult[2]),
        ),
        rifDecimals: callResult[2],
        rifTotalSupply: callResult[3].div(
          ethers.BigNumber.from(10).pow(callResult[2]),
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!(provider && address)) {
    return (
      <button onClick={connect} type="button">
        Connect wallet
      </button>
    );
  }
  return (
    <div>
      <p>{`Wallet: ${address}`}</p>
      <p>{`Wallet balance: ${dashboard.rbtcBalance} RBTC`}</p>
      <p>{`RIF balance: ${dashboard.rifBalance} RIF`}</p>
      <p>{`RIF decimals: ${dashboard.rifDecimals}`}</p>
      <p>{`RIF total supply: ${dashboard.rifTotalSupply} RIF`}</p>
      <button onClick={watchBalances} type="button">
        Watch balances
      </button>
    </div>
  );
}

export default App;
