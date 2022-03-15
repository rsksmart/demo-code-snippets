import { useState } from 'react';
import useWeb3 from './hooks/useWeb3';
import useBalance from './hooks/useBalance';
import './App.css';

function App() {
  // loading status
  const [isLoading, setIsLoading] = useState(false);
  // error messages
  const [errorMessage, setErrorMessage] = useState('');
  // get active account and balance data from useWeb3 hook
  const {
    connect,
    disconnect,
    provider,
    account: activeAccount,
  } = useWeb3(setIsLoading, setErrorMessage);
  // get active account balance from useBalance hook
  const activeBalance = useBalance(
    provider,
    activeAccount,
    setIsLoading,
    setErrorMessage,
  );

  // random non-empty account from RSK explorer https://explorer.rsk.co/
  const [customAcount, setCustomAccount] = useState(
    '0xC2a41f76CaCFa933c3496977f2160944EF8c2de3',
  );
  // get balance of the custom account
  const customBalance = useBalance(
    provider,
    customAcount,
    setIsLoading,
    setErrorMessage,
  );

  return (
    <div className="App">
      {/* instantiate web3 only after a user clicks the button */}
      {/* avoid doing it automatically */}
      {!provider ? (
        <button onClick={connect}>Connect to MetaMask</button>
      ) : (
        <>
          <p>Connected with {activeAccount}</p>
          <p>My balance: {activeBalance} RBTC</p>
          <p>Check RSK account:</p>
          <input
            type="text"
            value={customAcount}
            onChange={(e) => setCustomAccount(e.target.value)}
            style={{ width: '25rem' }}
          />
          <p>
            <a href={`https://explorer.rsk.co/address/${customAcount}`}>
              RSK account
            </a>
            {' balance:'}
            {customBalance} RBTC
          </p>
          <button onClick={disconnect}>Disconnect</button>
        </>
      )}
      {/* show loading and error statuses */}
      {isLoading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default App;
