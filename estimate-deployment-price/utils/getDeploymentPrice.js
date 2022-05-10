/**
 * Calculates a smart contract estimated deployment price
 * @param {string} contractName deploying smart contract name
 * @param  {...any} constructorParams smart contract's constructor parameters
 * @returns {Promise<bignumber>} estimated deployment price
 */
async function getDeploymentPrice(contractName, ...constructorParams) {
  const contractFactory = await ethers.getContractFactory(contractName);
  const deployTx = contractFactory.getDeployTransaction(...constructorParams);
  const estimatedGas = await contractFactory.signer.estimateGas(deployTx);
  const gasPrice = await contractFactory.signer.getGasPrice();
  const deploymentPrice = gasPrice.mul(estimatedGas);
  return deploymentPrice;
}

module.exports = getDeploymentPrice;
