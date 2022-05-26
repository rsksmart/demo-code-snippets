# RSK Testnet statistics

### Script calculates:
1. number of smart contract deployments between `startDate` and `endDate`
2. number of unique addresses that have deployed smart contracts between `startDate` and `endDate`

### Installation:
- rename `.template.env` to `.env` and put there your credentials
- install the dependencies:
```bash
npm install
```
### How to use:
Paste `startDate` and `endDate` constants at the top of `index.js` (under the `import` statesments) and type in the Terminal:
```bash
./index.js
```
