import { useContext } from 'react';
import rLoginContext from './contexts/rLoginContext';
import Connect from './components/Connect';
import GetBalance from './components/GetBalance';
import ErrorMessage from './components/ErrorMessage';
import LoadingStatus from './components/LoadingStatus';
import SendTransaction from './components/SendTransaction';
import SignMessage from './components/SignMessage';

function App() {
  const { account } = useContext(rLoginContext);
  return (
    <div className="App">
      <h1>Build a DApp with rLogin</h1>
      {!account ? (
        <Connect />
      ) : (
        <>
          <p>Wallet address: {account}</p>
          <GetBalance />
          <SendTransaction />
          <SignMessage />
        </>
      )}
      <ErrorMessage />
      <LoadingStatus />
    </div>
  );
}

export default App;
