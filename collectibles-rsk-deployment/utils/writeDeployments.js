/* eslint-disable no-undef */
const fs = require('fs');
const { deploymentFile } = require('../project.config.js');
const readDeployments = require('./readDeployments.js');

/**
 * Writes deployed Meow-NFT address for the current network to a JSON file
 * specified in `project.config.js`
 * @param {string} address deployment address in the selected network
 */
async function writeDeployments(address) {
  const { chainId } = await ethers.provider.getNetwork();
  const deployments = readDeployments();
  deployments[chainId] = address;
  fs.writeFileSync(deploymentFile, JSON.stringify(deployments), 'utf8');
}

module.exports = writeDeployments;
