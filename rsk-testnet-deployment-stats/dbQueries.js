import format from 'pg-format';
import dbPool from './dbPool.js';

async function queryDb(queryString, startDate, endDate) {
  // pg-format correctly interpolates dates as well
  const query = format(queryString, startDate, endDate);
  const queryResult = await dbPool.query(query);
  if (queryResult.rowCount === 0) return 0;
  return queryResult.rows[0].count;
}

export async function getDeploymentsNumber(startDate, endDate) {
  const queryString = `
  SELECT COUNT(*)
  FROM chain_rsk_testnet.block_transactions t
  WHERE t.signed_at >= %L
  AND t.signed_at <= %L
  AND t.to IS NULL
  `;
  return queryDb(queryString, startDate, endDate);
}

export async function getUniqueDeployersNumber(startDate, endDate) {
  const queryString = `
  SELECT COUNT(DISTINCT t.from)
  FROM chain_rsk_testnet.block_transactions t
  WHERE t.signed_at >= %L
  AND t.signed_at <= %L
  AND t.to IS NULL
  `;
  return queryDb(queryString, startDate, endDate);
}
