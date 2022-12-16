import { useContext, useState } from 'react';
import rLoginContext from '../contexts/rLoginContext';
import { utils } from 'ethers';

function GetBalance() {
  const { provider, account, tryRequest } = useContext(rLoginContext);

  const [balance, setBalance] = useState('');

  const getBalance = () => {
    tryRequest('Requesting balance', async () => {
      const weiBalance = await provider.request({
        method: 'eth_getBalance',
        params: [account],
      });
      // convert hexadecimal wei value to RBTC
      const rbtcBalance = utils.formatEther(weiBalance);
      setBalance(rbtcBalance);
    });
  };

  return (
    <div className="container">
      <h2>Request wallet balance</h2>
      {balance && <p>Balance: {balance} RBTC</p>}
      <button onClick={getBalance}>get balance</button>
    </div>
  );
}

export default GetBalance;
