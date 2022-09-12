# Number of smart contracts deployed to the RSK Testnet in the last week 

This repo shows how to calculate 
- the momentary value
- a simple moving average
- a weighted moving average
for the number of smart contracts deployed to the RSK Testnet in the last week.

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
    Number of smart contracts deployed to RSK Testnet in the last week
    Momentary: 229
    Simple moving average: 299.75
    Weighted moving average: 305.3
```