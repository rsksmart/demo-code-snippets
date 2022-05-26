#! /usr/bin/env node
import { parse } from 'path';
import { getDeploymentsNumber, getUniqueDeployersNumber } from './dbQueries.js';
import dbPool from './dbPool.js';

function readDatesFromUserInput() {
  const startDateInput = process.argv[2];
  const endDateInput = process.argv[3];
  const scriptName = parse(import.meta.url).base;
  if (!(startDateInput && endDateInput))
    throw new Error(`
  Please specify start and end dates in the format:
  ./${scriptName} startDate endDate
    `);
  // convert user input to Date objects
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);
  return [startDate, endDate];
}

async function main() {
  try {
    const [startDate, endDate] = readDatesFromUserInput();
    // send DB requests in parallel
    const [totalDeployments, uniqueDeployments] = await Promise.all([
      getDeploymentsNumber(startDate, endDate),
      getUniqueDeployersNumber(startDate, endDate),
    ]);
    console.log(`
    For the period from ${startDate.toDateString()} to ${endDate.toDateString()}
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
