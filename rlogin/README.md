# Build a DApp with rLogin

This demo repo shows how to make use of [rLogin library](https://developers.rsk.co/guides/rlogin/connect-frontend/) in a React.js application. 

## Contents:
- `src/rLoginOptions.js`: Rootstock network parameters and rLogin options
- `src/providers/RLoginProvider`:
  - connect to Web3 provider via rLogin
  - store the connection inside the React context provider
- `src/components/GetBalance.jsx`: request wallet balance
- `src/components/SendTransaction.jsx`: send some RBTC to an address
- `src/components/SignMessage.jsx`: digitally sign messages

## Installation
```shell
nvm use 16
yarn
```

## Run the app
```shell
yarn start
```