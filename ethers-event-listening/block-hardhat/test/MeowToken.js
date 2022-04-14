const { expect } = require('chai');
const { meowTotalSupply } = require('../project.config.js');
const deployContracts = require('../utils/deployContracts.js');

describe('Meow Token and Purr NFT', () => {
  let deployer;
  let buyer;
  let meowToken;

  const tokensToTransfer = 100;

  before(async () => {
    [deployer, buyer] = await ethers.getSigners();
    [meowToken] = await deployContracts();
  });

  it('Meow tokens total supply should be minted', async () => {
    expect(await meowToken.totalSupply()).to.equal(meowTotalSupply);
  });

  it('should be able to transfer tokens to the buyer', async () => {
    await expect(
      meowToken.connect(deployer).transfer(buyer.address, tokensToTransfer),
    ).to.emit(meowToken, 'Transfer');
  });

  it(`buyer's Meow balance should increase after the transfer`, async () => {
    expect(await meowToken.balanceOf(buyer.address)).to.equal(tokensToTransfer);
  });

  it(`deployer's Meow balance should decrease after the transfer`, async () => {
    expect(await meowToken.balanceOf(deployer.address)).to.equal(
      meowTotalSupply - tokensToTransfer,
    );
  });
});
