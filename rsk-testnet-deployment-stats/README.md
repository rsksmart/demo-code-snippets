# RSK Testnet statistics

### Script calculates:
1. number of smart contract deployments between `start-date` and `end-date`
2. number of unique addresses that have deployed smart contracts between `start-date` and `end-date`

### Installation:
- rename `.template.env` to `.env` and put there your credentials
- install the dependencies:
```bash
npm install
```
### How to use:
In the terminal command line specify start and end dates after the script name in a format:
`./index.js "start-date" "end-date"`
Possible formats of date and time:
```bash
./index.js "2022.04.01 00:30:30" "2022.04.01 22:30:30"
./index.js 2022.04.01 2022.04.02
./index.js 2022-04-01 2022-04-02
./index.js 2022.04 2022.05
./index.js 2022-04 2022-05
./index.js 2021 2022
```
