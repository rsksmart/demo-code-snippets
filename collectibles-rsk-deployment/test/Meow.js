/* eslint-disable no-undef */
const { expect } = require('chai');
const { ethers } = require('hardhat');
const { deployContracts, avoidMainet } = require('../utils');

describe('Meow NFT', () => {
  let deployer;
  let meowNft;

  before(async () => {
    await avoidMainet();
    [deployer] = await ethers.getSigners();
    meowNft = await deployContracts();
  });

  describe('upon deployment', () => {
    it('Deployer must be the owner', async () => {
      expect(await meowNft.owner()).to.equal(deployer.address);
    });

    it(`Owner's balance should be zero`, async () => {
      expect(await meowNft.balanceOf(deployer.address)).to.equal(0);
    });
  });

  describe('mint', () => {
    const newNftId = 1;
    it('should be able to mint new NFT', async () => {
      const tx = await meowNft
        .connect(deployer)
        .mintNFT(
          deployer.address,
          'ipfs://QmP7goH8m5XoFGPcLJTfCzUmncYLXSJUgijXKTsf4o25UH',
        );
      await expect(tx)
        .to.emit(meowNft, 'Transfer')
        .withArgs(ethers.constants.AddressZero, deployer.address, newNftId);
    });
  });
});
