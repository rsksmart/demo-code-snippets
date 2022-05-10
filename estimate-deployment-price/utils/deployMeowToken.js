/**
 * Deploys Meow token smart contract
 * @param {number} totalSupply Meow token total supply
 * @returns object representing the deployed smart contract
 */
async function deployMeowToken(totalSupply) {
  const contractFactory = await ethers.getContractFactory('MeowToken');
  meowToken = await contractFactory.deploy(totalSupply);
  await meowToken.deployed();
  return meowToken;
}

module.exports = deployMeowToken;
