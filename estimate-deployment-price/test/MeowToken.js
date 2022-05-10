const { expect } = require('chai');
const { ethers } = require('hardhat');
const {
  deployMeowToken,
  getDeploymentPrice,
  avoidMainnet,
} = require('../utils');

describe('Meow Token', () => {
  let meowToken;
  let deployer;
  let expectedDeploymentPrice;
  const totalSupply = 1e6;

  before(async () => {
    await avoidMainnet();
    [deployer] = await ethers.getSigners();
    // estimate a deployment price before the deployment
    expectedDeploymentPrice = await getDeploymentPrice(
      'MeowToken',
      totalSupply,
    );
    // actual deployment
    meowToken = await deployMeowToken(totalSupply);
  });

  describe('Upon deployment', () => {
    it('estimated gas price should be precise', async () => {
      const {
        deployTransaction: { hash, gasPrice },
      } = meowToken;
      const { gasUsed } = await ethers.provider.getTransactionReceipt(hash);
      const feesPaid = gasUsed.mul(gasPrice);
      expect(feesPaid).to.equal(expectedDeploymentPrice);
    });

    it('deployer should be the owner', async () => {
      expect(await meowToken.owner()).to.equal(deployer.address);
    });

    it('deployer should own all the tokens', async () => {
      expect(await meowToken.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });
});
