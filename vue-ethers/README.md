# vue-ethers

This demo repo shows how to use [vue.js](https://vuejs.org/guide/introduction.html) in order to:
- connect to [Metamask](https://docs.metamask.io/guide/)
- connect Metamask to [ethers.js](https://docs.ethers.io/v5/) [Web3Provider](https://docs.ethers.io/v5/api/providers/other/#Web3Provider)
- track RBTC balance of the connected wallet
- send some RBTC to a specified address

The app includes the following main components:
- `rootstock.js` a [Pinia storage](https://pinia.vuejs.org/introduction.html) incapsulating web3 provider instance and the connection / interaction logic. Keeping this data in one place allowes all app components to have direct access to the Rootstock blockchain data
- `App.vue` - the main application component
- `ConnectWallet.vue` - UI initiating Metamask wallet connection
- `MessageBoard.vue` - UI showing error and loading statuses
- `SendRbtc.vue` - UI and logic for sending a transaction to transfer RBTC to selected address
- `WalletDashboard.vue` - UI showing the Rootstock blockchain data

## Installation
```shell
npm install
```

## Start the app
```shell
npm run dev
```