import { ethers, waffle } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { meowTotalSupply } from '../constants';

// smart contract ABI
import MeowTokenArtifact from '../artifacts/contracts/MeowToken.sol/MeowToken.json';
// smart contract TypeScript interface
import { MeowToken } from '../typechain-types/contracts/MeowToken';

describe('Meow Token', () => {
  let deployer: SignerWithAddress;
  let buyer: SignerWithAddress;
  let meowToken: MeowToken;

  const tokensToTransfer = 100;

  before(async function () {
    [deployer, buyer] = await ethers.getSigners();
    meowToken = (await waffle.deployContract(deployer, MeowTokenArtifact, [
      meowTotalSupply,
    ])) as MeowToken;
    await meowToken.deployed();
  });

  it('total supply should be minted', async () => {
    expect(await meowToken.balanceOf(deployer.address)).to.equal(
      meowTotalSupply,
    );
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
