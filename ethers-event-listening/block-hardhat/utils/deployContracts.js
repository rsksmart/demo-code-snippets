const { meowTotalSupply } = require('../project.config.js');

async function deployContracts() {
  const meowContractFactory = await ethers.getContractFactory('MeowToken');
  const meowToken = await meowContractFactory.deploy(meowTotalSupply);
  await meowToken.deployed();

  return [meowToken];
}

module.exports = deployContracts;
