#!/usr/bin/env node
/**
 * Run './index.js' to calculate the average transaction gas fee
 * for the last 'numberOfDays' on RSK
 */

import axios from 'axios';
import dotenv from 'dotenv';
import pMap from 'p-map';
import web3 from './web3.js';

const numberOfDays = 2;

dotenv.config();

function formatDate(date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

async function getBlocksForLastDays(days = 3) {
  const now = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - days);
  const response = await axios.get(
    `https://api.covalenthq.com/v1/30/block_v2/${formatDate(
      daysAgo,
    )}/${formatDate(now)}/?quote-currency=USD&format=JSON&key=${
      process.env.COVALENT_API_KEY
    }&page-size=1000000`,
  );
  return response.data?.data?.items ?? [];
}

// p-map mapper
async function scanBlocks(block) {
  // setting the 2-nd param to 'true' causes the method to return transactions
  // as objects instead of just hashes
  const blocks = await web3.eth.getBlock(block.height, true);
  return blocks;
}

async function main() {
  try {
    // get recent blocks
    const blockHeights = await getBlocksForLastDays(numberOfDays);
    console.log(`Scanning the last ${blockHeights.length} blocks on RSK`);
    // getting block data with transactions
    const blocks = await pMap(blockHeights, scanBlocks, { concurrency: 10 });
    // extract txs to an array
    const txs = blocks.reduce((p, c) => [...p, ...c.transactions], []);
    console.log(`Analysing ${txs.length} transactions`);
    // calculate averave gas fee per transaction
    const avgGasFees = web3.utils.fromWei(
      (
        txs.reduce((p, c) => p + Number(c.gasPrice) * c.gas, 0) / txs.length
      ).toFixed(0),
    );
    console.log(
      `The last ${numberOfDays} day${
        numberOfDays > 1 ? 's' : ''
      } average transaction gas fee on RSK is ${avgGasFees} RBTC`,
    );
  } catch (error) {
    console.log('Error', error.message);
  } finally {
    await web3.currentProvider.disconnect();
  }
}

main();
