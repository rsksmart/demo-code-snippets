# Build a DApp with rLogin

This demo repo shows how to make use of [rLogin library](https://developers.rsk.co/guides/rlogin/connect-frontend/) in a React.js application. 

The demo react application shows how to:
- `providers/RLoginProvider`
  - connect to Web3 provider via rLogin
  - store the connection inside the React context provider
- `components/GetBalance.jsx` - request wallet balance
- `components/SendTransaction.jsx` - send some RBTC to an address
- `components/SignMessage.jsx` - digitally sign messages

## Installation
```shell
nvm use 16
yarn
```

## Run the app
```shell
yarn start
```