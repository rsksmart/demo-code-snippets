const fs = require('fs');
const path = require('path');
const hre = require('hardhat');
const { frontendPath } = require('../project.config.js');

function mkDirIfNotExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Writes smart contract ABI and deployment address to the frontend contracts folder,
 * which can be specified in `project.config.js`
 * @param {string} name Hardhat artifact name (coincides with the contract name)
 * @param {string} address deployed smart contract address
 */
async function writeArtifactToFrontend(name, address) {
  const { abi } = await hre.artifacts.readArtifact(name);
  const contractData = {
    address,
    abi,
  };
  mkDirIfNotExists(frontendPath);
  const fileName = path.join(frontendPath, `${name}.json`);
  fs.writeFileSync(fileName, JSON.stringify(contractData), 'utf8');
  console.log(`${name} ABI and address were written to ${fileName}`);
}

module.exports = writeArtifactToFrontend;
