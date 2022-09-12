# Number of unique deployers on RSK Testnet in the last week 

This repo shows how to calculate 
- the momentary value
- a simple moving average
- a weighted moving average
for the number of unique smart contract deployers on RSK Testnet in the last week.

## Installation

Rename `.sample.env` to `.env` and paste your Covalent database credentials.

```bash
npm install
```

## Run the script

```bash
./index.js
```
The script outputs e.g.:
```
    Number of unique deployers on RSK Testnet for the previous week
    Momentary: 40
    Simple moving average: 31.25
    Weighted moving average: 34.3
```