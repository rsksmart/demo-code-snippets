const { expect } = require('chai');
require('dotenv').config();
const deployContracts = require('../utils/deployContracts.js');

describe('Meow Token and Purr NFT', () => {
  let meowToken;
  let purrNft;

  before(async () => {
    [meowToken, purrNft] = await deployContracts();
  });

  it('Meow tokens total supply should be minted', async () => {
    expect(await meowToken.totalSupply()).to.equal(
      process.env.MEOW_TOTAL_SUPPLY,
    );
  });

  it('Purr NFT should have Meow Token as an accepted token', async () => {
    expect(await purrNft.acceptedToken()).to.equal(meowToken.address);
  });
});
