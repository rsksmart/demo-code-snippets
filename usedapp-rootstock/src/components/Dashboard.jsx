import { utils } from 'ethers';
import { useEthers, useEtherBalance, useTokenBalance } from '@usedapp/core';
import dappConfig from '../usedapp.config';

const rif = {
  31: '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE',
  30: '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5',
};

function Dashboard() {
  const { account, chainId } = useEthers();
  const rbtcBalance = useEtherBalance(account);
  const rifBalance = useTokenBalance(rif[chainId].toLowerCase(), account);

  const getChainName = (id) =>
    dappConfig.networks.find((chain) => chain.chainId === id).chainName;

  return (
    <table className="dashboard">
      <tbody>
        <tr>
          <td>Chain ID</td>
          <td>{chainId}</td>
        </tr>
        <tr>
          <td>Chain name</td>
          <td>{getChainName(chainId)}</td>
        </tr>
        <tr>
          <td>Account</td>
          <td>{account}</td>
        </tr>
        <tr>
          <td>RBTC balance</td>
          <td>{utils.formatEther(rbtcBalance ?? 0)} RBTC</td>
        </tr>
        <tr>
          <td>RIF balance</td>
          <td>{utils.formatEther(rifBalance ?? 0)} RIF</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Dashboard;
