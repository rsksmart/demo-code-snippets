import { useState } from 'react';
import { utils } from 'ethers';
import { useSendTransaction } from '@usedapp/core';

const faucetAddress = '0x88250f772101179a4ecfaa4b92a983676a3ce445';

function SendRbtc() {
  const { sendTransaction, state } = useSendTransaction();
  const [addressTo, setAddressTo] = useState(faucetAddress);
  const [rbtcToSend, setRbtcToSend] = useState(0.000001);

  const sendRbtc = async () => {
    const rbtcAmount = utils.parseEther(rbtcToSend.toString());
    const address = utils.getAddress(addressTo);
    await sendTransaction({ to: address, value: rbtcAmount });
  };
  return (
    <div className="send-rbtc">
      <label>
        Send
        <input
          type="number"
          value={rbtcToSend}
          onChange={(e) => setRbtcToSend(e.target.value)}
          min={0}
          step={0.001}
        />
        RBTC
      </label>
      <label>
        to address
        <input
          type="text"
          value={addressTo}
          onChange={(e) => setAddressTo(e.target.value)}
        />
      </label>
      {state.status === 'Mining' && (
        <p>Mining transaction {state.transaction.hash}</p>
      )}
      <button type="button" onClick={sendRbtc}>
        Send transaction
      </button>
    </div>
  );
}

export default SendRbtc;
