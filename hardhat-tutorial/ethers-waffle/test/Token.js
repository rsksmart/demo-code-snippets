/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const { expect } = require('chai');

describe('Transactions', () => {
  it('Should transfer tokens between accounts', async () => {
    const signers = await ethers.getSigners();
    // convert addresses to lower case
    signers.forEach((signer) => {
      // eslint-disable-next-line no-param-reassign
      signer.address = signer.address.toLowerCase();
    });
    const [owner, addr1, addr2] = signers;
    const Token = await ethers.getContractFactory('Token');
    console.log('Owner account: ', owner.address);
    const hardhatToken = await Token.deploy();
    console.log('Before transction');
    console.log('Owner balance: ', await hardhatToken.balanceOf(owner.address));
    console.log('Addr1 balance: ', await hardhatToken.balanceOf(addr1.address));
    // Transfer 50 tokens from owner to addr1
    await hardhatToken.connect(owner).transfer(addr1.address, 50);
    console.log('After transction');
    console.log('Owner balance: ', await hardhatToken.balanceOf(owner.address));
    console.log('Addr1 balance: ', await hardhatToken.balanceOf(addr1.address));
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });
});
