const readMnemonic = require('./readMnemonic.js');
const deployContracts = require('./deployContracts.js');
const mintNfts = require('./mintNfts.js');
const readDeployments = require('./readDeployments.js');
const writeDeployments = require('./writeDeployments.js');
const getDeployedAddress = require('./getDeployedAddress.js');
const avoidMainet = require('./avoidMainet.js');

module.exports = {
  readMnemonic,
  deployContracts,
  mintNfts,
  readDeployments,
  writeDeployments,
  getDeployedAddress,
  avoidMainet,
};
