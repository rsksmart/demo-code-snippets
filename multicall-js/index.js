const WALLET_ADDRESS = '0xb42c26BB804987EE7FEFb897eB18ED775da19Fe4';
const TRIF_ADDRESS = '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE';

const configRskTestnet = {
  rpcUrl: 'https://public-node.testnet.rsk.co',
  multicallAddress: '0x9e469e1fc7fb4c5d17897b68eaf1afc9df39f103',
};

const watcher = Multicall.createWatcher(
  [
    {
      target: TRIF_ADDRESS,
      call: ['balanceOf(address)(uint256)', WALLET_ADDRESS],
      returns: [['BALANCE_OF_FISH', (val) => val / 10 ** 18]],
    },
    {
      call: ['getEthBalance(address)(uint256)', WALLET_ADDRESS],
      returns: [['ETH_BALANCE', (val) => val / 10 ** 18]],
    },
  ],
  configRskTestnet,
);

// Subscribe to state updates
watcher.subscribe((update) => {
  console.log(`Update: ${update.type} = ${update.value}`);
});
watcher.onNewBlock((blockNumber) => {
  console.log('New block:', blockNumber);
});
