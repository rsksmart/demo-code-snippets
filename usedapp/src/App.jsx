import { useState } from 'react';
import {
  useEtherBalance,
  useTokenBalance,
  useEthers,
  useSendTransaction,
} from '@usedapp/core';
import { utils } from 'ethers';

const rifAddress = {
  31: '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE',
  30: '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5',
};

function App() {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const rifBalance = useTokenBalance(
    rifAddress[chainId]?.toLowerCase(),
    account,
  );
  const { sendTransaction } = useSendTransaction();
  const [addressTo, setAddressTo] = useState(
    '0xB62BD53308fb2834b3114a5f725D0382CBe9f008',
  );
  const [rbtcToSend, setRbtcToSend] = useState(0.001);

  const sendRbtc = async () => {
    const rbtcAmount = utils.parseEther(rbtcToSend.toString());
    const address = utils.getAddress(addressTo);
    await sendTransaction({ to: address, value: rbtcAmount });
  };

  if (!account)
    return (
      <div>
        <p>Connect Metamask wallet</p>
        <button type="button" onClick={activateBrowserWallet}>
          Connect
        </button>
      </div>
    );

  return (
    <div className="App">
      <p>{`Account: ${account}`}</p>
      <p>{`RBTC balance: ${utils.formatEther(etherBalance ?? 0)}`}</p>
      <p>{`RIF balance: ${utils.formatEther(rifBalance ?? 0)}`}</p>

      <div>
        {`Send `}
        <input
          type="number"
          value={rbtcToSend}
          onChange={(e) => setRbtcToSend(e.target.value)}
          min={0}
          step={0.001}
        />
        {` RBTC to address `}
        <input
          type="text"
          value={addressTo}
          onChange={(e) => setAddressTo(e.target.value)}
        />
        <button type="button" onClick={sendRbtc}>
          Send
        </button>
      </div>

      <div>
        <button type="button" onClick={deactivate}>
          Deactivate
        </button>
      </div>
    </div>
  );
}

export default App;
