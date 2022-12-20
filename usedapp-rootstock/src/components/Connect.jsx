import { useEthers } from '@usedapp/core';

function Connect() {
  const { activateBrowserWallet } = useEthers();

  return (
    <div>
      <button onClick={() => activateBrowserWallet()}>Connect</button>
    </div>
  );
}

export default Connect;
