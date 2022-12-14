import { useContext, useState } from 'react';
import rLoginContext from '../contexts/rLoginContext';
import { rskTestnet } from '../rskConfig';

const faucetAddress = '0x88250f772101179a4ecfaa4b92a983676a3ce445';

function SendTransaction() {
  const { provider, account, tryRequest } = useContext(rLoginContext);

  const [toAddress, setToaddress] = useState(faucetAddress);
  const [weiToSend, setWeiToSend] = useState('1000');
  const [txHash, setTxHash] = useState('');

  const sendTransaction = () => {
    tryRequest('Sending transaction', async () => {
      const txHashValue = await provider.request({
        method: 'eth_sendTransaction',
        params: [{ from: account, to: faucetAddress, value: weiToSend }],
      });

      setTxHash(txHashValue);
    });
  };

  return (
    <div className="container">
      <h2>Send transactions</h2>
      <label>
        Send{' '}
        <input
          type="number"
          value={weiToSend}
          min={0}
          onChange={(e) => setWeiToSend(e.target.value)}
        />{' '}
        wei to address
      </label>
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToaddress(e.target.value)}
        className="to-address"
      />
      {txHash && (
        <div>
          <p>Transaction has been sent</p>
          <p>
            <a
              href={`${rskTestnet.explorerUrl}/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              hash: {txHash}
            </a>
          </p>
        </div>
      )}
      <button onClick={sendTransaction}>send transaction</button>
    </div>
  );
}

export default SendTransaction;
