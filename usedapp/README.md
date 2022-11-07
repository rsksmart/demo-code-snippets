# useDApp on Rootstock

This demo repo shows how to read Rootstock blockchain data and interract with Rootstock deployed smart contracts by means of [useDApp](https://usedapp.io/)

Here you find examples of how to:
- create Rootstock chains configuration (`src/config/rootstock.js`)
- create useDApp configuration (`src/config/useDApp.js`)
- connect useDApp provider to a React app (`src/index.jsx`)
- connect Metamask to useDApp (`src/app.jsx`)
- use useDApp hooks to view blockchain data and sent transactions (`src/app.jsx`)

For smart contract view function invokations useDApp uses aggregated calls to Multicall smart contract. In this repo Rootstock configuration (`src/config/rootstock.js`) we used [Multacall3](https://github.com/mds1/multicall) smart contracts deployed on Rootstock with addresses:
- Rootstock Mainnet: [0xcA11bde05977b3631167028862bE2a173976CA11](https://explorer.rsk.co/address/0xca11bde05977b3631167028862be2a173976ca11)
- Rootstock Testnet: [0xcA11bde05977b3631167028862bE2a173976CA11](https://explorer.testnet.rsk.co/address/0xca11bde05977b3631167028862be2a173976ca11)

To launch the demo React app, run:
```shell
npm install
npm start
```