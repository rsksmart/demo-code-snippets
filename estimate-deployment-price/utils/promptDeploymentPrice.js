const { prompt } = require('inquirer');
const getRbtcPrice = require('./getRbtcPrice.js');

const toRbtc = (wei) => ethers.utils.formatEther(wei);

/**
 * Askes the signer (deployer) to confirm a transaction price by
 * showing him a terminal prompt. Terminates the transaction if the signer
 * said 'No'
 * @param {bignumber} txPrice estimated transaction price, RBTC
 * @param {string} currency fiat currency symbol
 */
async function promptDeploymentPrice(txPrice, currency = 'usd') {
  const rbtcPrice = await getRbtcPrice(currency);
  const toFiatPrice = (wei) => (rbtcPrice * toRbtc(wei)).toFixed(2);
  const { deployerChoice } = await prompt([
    {
      type: 'confirm',
      name: 'deployerChoice',
      message: `The deployment price is ${toRbtc(txPrice)} RBTC (${toFiatPrice(
        txPrice,
      )} ${currency}). Do you want to proceed?`,
      default: true,
    },
  ]);
  if (!deployerChoice)
    throw new Error(
      'Terminating. The transaction price was considered too high.',
    );
}

module.exports = promptDeploymentPrice;
