import { useCallback, useState } from 'react';
import { createWatcher } from '@makerdao/multicall';

const WALLET_ADDRESS = '0xb42c26BB804987EE7FEFb897eB18ED775da19Fe4';
const tRIF_ADDRESS = '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE';

const configRskTestnet = {
  rpcUrl: 'https://public-node.testnet.rsk.co',
  multicallAddress: '0x9e469e1fc7fb4c5d17897b68eaf1afc9df39f103',
};

/* const configRskMainnet = {
  rpcUrl: 'https://public-node.rsk.co',
  multicallAddress: '0x6c62bf5440de2cb157205b15c424bceb5c3368f5',
}; */

function App() {
  const [rbtcBalance, setRbtcBalance] = useState(0);
  const [rifBalance, setRifBalance] = useState(0);

  const watch = useCallback(() => {
    const watcher = createWatcher(
      [
        {
          call: ['getEthBalance(address)(uint256)', WALLET_ADDRESS],
          returns: [['ETH_BALANCE', (val) => val / 10 ** 18]],
        },
        {
          target: tRIF_ADDRESS,
          call: ['balanceOf(address)(uint256)', WALLET_ADDRESS],
          returns: [['RBTC_BALANCE', (val) => val / 10 ** 18]],
        },
      ],
      configRskTestnet,
    );

    console.log(watcher);
    watcher.subscribe((update) => {
      console.log(`Update: ${update.type} = ${update.value}`);
    });

    // Subscribe to batched state updates
    /* watcher.batch().subscribe((updates) => {
      // Handle batched updates here
      // Updates are returned as { type, value } objects, e.g:
      // { type: 'BALANCE_OF_MKR_WHALE', value: 70000 }
    }); */

    // Subscribe to new block number updates
    watcher.onNewBlock((blockNumber) => {
      console.log('New block:', blockNumber);
    });

    // Start the watcher polling
    watcher.start();
  }, []);
  return (
    <div>
      <p>{`Wallet balance: ${rbtcBalance} RBTC`}</p>
      <p>{`RIF balance: ${rifBalance} RBTC`}</p>
      <button onClick={watch} type="button">
        Watch balances
      </button>
    </div>
  );
}

export default App;
