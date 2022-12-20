# Build on Rootstock with useDApp

This demo repo shows how to build a DApp on Rootstock using [useDApp](https://usedapp.io/) React library

## App Components
Different React components perform various tasks:
- `usedapp.config.js` configures useDApp to work with Rootstock networks
- `Connect.jsx` initiates web3 provider connection
- `SwitchNetwork.jsx` connects to either Rootstock Testnet or Rootstock Mainnet
- `Dashboard.jsx` shows the blockchain data within the selected Rootstock network:
  - Chain ID
  - Chain name
  - Account address
  - Account RBTC balance
  - Account RIF token balance
- `SendRbtc.jsx` sends the specified RBTC amount to the specified address
- `App.jsx` connects all components and implements the app logic:
  1. when the web3 provider (Metamask) is not connected, allows user to initiate the connection
  2. if the provider is connected to a network other than Rootstock, prompts to switch the network to either Rootstock Mainnet or Rootstock Testnet
  3. when connected to Rootstock, displays the Dashboard and offers to send RBTC

## Installation
To launch the demo React app, run:
```shell
npm install
npm start
```