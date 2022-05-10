const checkDeployerBalance = require('./checkDeployerBalance.js');
const deployMeowToken = require('./deployMeowToken.js');
const getDeploymentPrice = require('./getDeploymentPrice.js');
const promptDeploymentPrice = require('./promptDeploymentPrice.js');
const avoidMainnet = require('./avoidMainet.js');

module.exports = {
  checkDeployerBalance,
  deployMeowToken,
  getDeploymentPrice,
  promptDeploymentPrice,
  avoidMainnet,
};
