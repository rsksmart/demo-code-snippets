/**
 * Compares a transaction price with with deployer's balance and throws
 * an error if the deployer doesn't have enough money
 * @param {bignumber} txPrice estimated transaction price, RBTC
 */
async function checkDeployerBalance(txPrice) {
  const [deployer] = await ethers.getSigners();
  const deployerBalance = await deployer.getBalance();
  if (deployerBalance.lt(txPrice)) {
    const difference = ethers.utils.formatEther(txPrice.sub(deployerBalance));
    throw new Error(
      `Insufficient funds. Top up your account balance by ${difference} RBTC`,
    );
  }
}

module.exports = checkDeployerBalance;
