#! /usr/bin/env node

const format = require('pg-format');
const db = require('./dbPool.js');
const {
  getSimpleMovingAverage,
  getWeightedMovingAverage,
  getWindows,
} = require('./util');

async function queryDB(intervals = []) {
  const queryStr = `
  (SELECT
    %s as week,
    COUNT(*) as deployments
  FROM chain_rsk_testnet.block_transactions t
  WHERE t.signed_at >= %L::date
  AND t.signed_at <= %L::date
  AND t.to IS NULL)
  `;
  // generate combined query to get dev activity within each time period
  const union = Array(intervals.length)
    .fill(queryStr)
    .join('UNION')
    .concat('ORDER BY week DESC');
  // parameters for query string interpolation
  const formatParams = intervals.flatMap(([dateFrom, dateTo], i) => [
    i + 1,
    dateFrom,
    dateTo,
  ]);
  const query = format(union, ...formatParams);
  const dbResponse = await db.query(query);
  return dbResponse.rows.map(({ deployments }) => deployments);
}

async function main() {
  try {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const windows = getWindows(weekAgo, now);
    const dbData = await queryDB(windows);
    const sma = getSimpleMovingAverage(dbData);
    const wma = getWeightedMovingAverage(dbData);
    console.log(`
    Number of smart contracts deployed to RSK Testnet in the last week
    Momentary: ${dbData[dbData.length - 1]}
    Simple moving average: ${sma}
    Weighted moving average: ${wma}
    `);
  } catch (error) {
    console.log(error.message);
  } finally {
    await db.end();
  }
}
main();
