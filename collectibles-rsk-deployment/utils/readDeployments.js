const fs = require('fs');
const { deploymentFile } = require('../project.config.js');

/**
 * Reads Meow-nft deployment addresses from a JSON file
 * @returns deployment addresses object
 */
function readDeployments() {
  let deployments;
  try {
    deployments = JSON.parse(fs.readFileSync(deploymentFile, 'utf8'));
  } catch (error) {
    deployments = {};
  }
  return deployments;
}

module.exports = readDeployments;
