const { expect } = require("chai");

describe("Transactions", function() {
  it("Should transfer tokens between accounts", async function() {
    const signers = await ethers.getSigners();
    signers.forEach((signer) => {
      signer.address = signer.address.toLowerCase()
    });
    const [owner, addr1, addr2] = signers;
    const Token = await ethers.getContractFactory("Token");
    console.log(owner.address, addr1.address);
    const hardhatToken = await Token.deploy();
    console.log(await hardhatToken.balanceOf(owner.address));
    console.log(await hardhatToken.balanceOf(addr1.address));
    // Transfer 50 tokens from owner to addr1
    await hardhatToken.connect(owner).transfer(addr1.address, 50);
    console.log(await hardhatToken.balanceOf(owner.address));
    console.log(await hardhatToken.balanceOf(addr1.address));
    // expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    /* await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50); */
  });
});
