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
    COUNT(DISTINCT t.from) as deployers
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
  return dbResponse.rows.map(({ deployers }) => deployers);
}

async function main() {
  try {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const windows = getWindows(weekAgo, now);
    const momentary = await queryDB(windows);
    const sma = getSimpleMovingAverage(momentary);
    const wma = getWeightedMovingAverage(momentary);
    console.log(`
    Number of unique deployers on RSK Testnet for the last week
    Momentary: ${momentary[momentary.length - 1]}
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
