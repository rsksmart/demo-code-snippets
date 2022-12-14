import { useContext, useState } from 'react';
import rLoginContext from '../contexts/rLoginContext';

function SignMessage() {
  const { provider, account, tryRequest } = useContext(rLoginContext);

  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');

  const signMessage = () => {
    tryRequest('Signing message', async () => {
      const personalSign = await provider.request({
        method: 'personal_sign',
        params: [message, account],
      });

      setSignedMessage(personalSign);
    });
  };

  return (
    <div className="container">
      <h2>Digitally sign messages</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="enter a message to sign"
        className="message-field"
      />
      {signedMessage && <p>signature: {signedMessage}</p>}
      <button onClick={signMessage}>sign message</button>
    </div>
  );
}

export default SignMessage;
