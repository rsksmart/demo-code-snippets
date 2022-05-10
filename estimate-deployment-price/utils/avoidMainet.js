const mainnets = [1, 30];

/**
 * Prevents from running on a mainnet
 */
async function avoidMainet() {
  const { chainId } = await ethers.provider.getNetwork();
  if (mainnets.some((id) => id === Number(chainId))) {
    console.log(`Don't run this test on a real network!!!!!`);
    process.exit(1);
  }
}

module.exports = avoidMainet;
