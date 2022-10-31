import { useEthers } from '@usedapp/core';

function MetamaskConnect() {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <div>
      <div>
        <button type="button" onClick={() => activateBrowserWallet()}>
          Connect
        </button>
      </div>
      {account && <p>Account: {account}</p>}
    </div>
  );
}

export default MetamaskConnect;
