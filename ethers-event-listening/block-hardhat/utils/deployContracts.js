const { meowTotalSupply } = require('../project.config.js');

/**
 * Deploys test smart contract(s) on the connected network
 * @returns array of deployed contract objects
 */
async function deployContracts() {
  const meowContractFactory = await ethers.getContractFactory('MeowToken');
  const meowToken = await meowContractFactory.deploy(meowTotalSupply);
  await meowToken.deployed();

  return [meowToken];
}

module.exports = deployContracts;
