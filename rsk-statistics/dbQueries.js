import format from 'pg-format';
import dbPool from './dbPool.js';

export async function getDeploymentsNumber(startDate, endDate) {
  const queryString = format(
    `
    SELECT COUNT(*)
    FROM chain_rsk_testnet.block_transactions t
    WHERE t.signed_at >= %L
    AND t.signed_at <= %L
    AND t.to IS NULL
    `,
    startDate,
    endDate,
  );
  const queryResult = await dbPool.query(queryString);
  if (queryResult.rowCount === 0) return 0;
  return queryResult.rows[0].count;
}

export async function getUniqueDeployersNumber(startDate, endDate) {
  const queryString = format(
    `
    SELECT COUNT(DISTINCT t.from)
    FROM chain_rsk_testnet.block_transactions t
    WHERE t.signed_at >= %L
    AND t.signed_at <= %L
    AND t.to IS NULL
    `,
    startDate,
    endDate,
  );
  const queryResult = await dbPool.query(queryString);
  if (queryResult.rowCount === 0) return 0;
  return queryResult.rows[0].count;
}
