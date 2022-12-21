import { useState } from 'react';
// NOTE this import is the significant one for this demo
import { useEthers, RootstockMainnet, RootstockTestnet } from '@usedapp/core';

function SwitchNetwork() {
  const [network, setNetwork] = useState(RootstockTestnet.chainId);
  const { switchNetwork } = useEthers();

  const selectNetwork = (e) => setNetwork(Number(e.target.value));

  return (
    <div className="switch-networks">
      <h2>Select one of the supported networks:</h2>
      <label>
        <input
          type="radio"
          name="network"
          value={RootstockMainnet.chainId}
          checked={network === RootstockMainnet.chainId}
          onChange={selectNetwork}
        />
        {RootstockMainnet.chainName}
      </label>
      <label>
        <input
          type="radio"
          name="network"
          value={RootstockTestnet.chainId}
          checked={network === RootstockTestnet.chainId}
          onChange={selectNetwork}
        />
        {RootstockTestnet.chainName}
      </label>
      <button onClick={() => switchNetwork(network)}>Switch</button>
    </div>
  );
}

export default SwitchNetwork;
