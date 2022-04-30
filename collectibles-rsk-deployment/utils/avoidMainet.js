/* eslint-disable no-undef */
const mainnets = [1, 30];

/**
 * Prevents from running on a mainnet
 */
async function avoidMainet() {
  const { chainId } = await ethers.provider.getNetwork();
  // both 1 and '1' must match
  // eslint-disable-next-line eqeqeq
  if (mainnets.some((id) => id == chainId))
    throw new Error('dont run this test on a real network!!!!!');
}

module.exports = avoidMainet;
