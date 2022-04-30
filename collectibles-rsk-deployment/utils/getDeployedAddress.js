/* eslint-disable no-undef */
const readDeployments = require('./readDeployments.js');

/**
 * Reads Meow-nft deployment addresses from JSON file and returns one
 * for the current network
 * @returns current blockchain deployment address
 */
async function getDeployedAddress() {
  const { chainId } = await ethers.provider.getNetwork();
  const deployments = readDeployments();
  const address = deployments[chainId];
  if (!address)
    throw new Error(
      `Smart contract is not deployed on the current network. First run 'npx hardhat deploy --network yourNetwork'`,
    );
  return address;
}

module.exports = getDeployedAddress;
