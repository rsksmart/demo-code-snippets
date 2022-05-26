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
- modify the dates you are interested in for the `startDate` and `endDate` constants near the top of `index.js`
- type in the Terminal:
```bash
./index.js
```
