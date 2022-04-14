import { useState } from 'react';
import { useEthers, useSmartContract } from './hooks';

function App() {
  const [transferTo, setTransferTo] = useState(
    '0x55C7891137819BBa7502b6BDA5A40FBB79c76f6D',
  );
  const [transferAmount, setTransferTAmount] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { provider, enable, disable } = useEthers(setErrorMessage, setLoading);
  const [meowToken, meowTransferEvent] = useSmartContract(
    provider,
    'MeowToken',
    setErrorMessage,
    setLoading,
  );
  const transferMeowTokens = async () => {
    if (meowToken) {
      try {
        setErrorMessage('');
        setLoading(true);
        const signer = await provider.getSigner();
        await meowToken.connect(signer).transfer(transferTo, transferAmount);
      } catch (error) {
        setErrorMessage(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      {!provider ? (
        <button onClick={enable}>Connect Metamask</button>
      ) : (
        <>
          <div>
            {`Meow amount: `}
            <input
              type="number"
              value={transferAmount}
              onChange={(e) => setTransferTAmount(Number(e.target.value))}
              min={1}
              max={10000}
            />
            {` to address: `}
            <input
              type="text"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
            />
          </div>
          <button
            onClick={transferMeowTokens}
          >{`Transfer ${transferAmount} Meows`}</button>
          <button onClick={disable}>Disconnect provider</button>
          {meowTransferEvent && (
            <>
              <h3>Transfer event registered</h3>
              <p>from: {meowTransferEvent.from}</p>
              <p>to: {meowTransferEvent.to}</p>
              <p>amount: {meowTransferEvent.amount}</p>
            </>
          )}
        </>
      )}
      {loading && <p>Loading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
}

export default App;
