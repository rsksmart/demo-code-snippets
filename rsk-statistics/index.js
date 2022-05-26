#! /usr/bin/env node
import { getDeploymentsNumber, getUniqueDeployersNumber } from './dbQueries.js';
import dbPool from './dbPool.js';

const startDate = '2022-04-01 00:00';
const endDate = '2022-05-01 00:00';

async function main() {
  try {
    const totalDeployments = await getDeploymentsNumber(startDate, endDate);
    const uniqueDeployments = await getUniqueDeployersNumber(
      startDate,
      endDate,
    );
    console.log(`
    For the period from ${startDate} to ${endDate}
    on the RSK Testnet there were ${totalDeployments} smart contract deployments
    of which ${uniqueDeployments} were from unique addresses.
    `);
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  } finally {
    await dbPool.end();
  }
}
main();
