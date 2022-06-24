const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Transfer and pay', () => {
  let deployer;
  let buyer;
  let payableToken;
  let tokenReceiver;

  const tokenAmount = 1000;

  before(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const PayableToken = await ethers.getContractFactory('PayableToken');
    payableToken = await PayableToken.deploy();
    await payableToken.deployed();
    const TokenReceiver = await ethers.getContractFactory('TokenReceiver');
    tokenReceiver = await TokenReceiver.deploy(payableToken.address);
    await tokenReceiver.deployed();
  });

  it('deployer should transfer some tokens to buyer', async () => {
    const tx = payableToken.transfer(buyer.address, tokenAmount);
    await expect(tx)
      .to.emit(payableToken, 'Transfer')
      .withArgs(deployer.address, buyer.address, tokenAmount);
  });

  it('buyer should be able to pay tokens and buy products in one transaction', async () => {
    // TokenReceiver `buy` function signature hash: 0x85f16ff4
    const buySigHash = tokenReceiver.interface.getSighash('buy');
    // providing some product properties to the TokenReceiver
    const productAmount = 99;
    const color = '0x121212';
    // packing `buy` signature and the properties together
    const calldata = ethers.utils.defaultAbiCoder.encode(
      ['bytes4', 'uint256', 'bytes3'],
      [buySigHash, productAmount, color],
    );
    // signature is needed because there are 2 `transferAndCall`s
    const transferAndCallSig = 'transferAndCall(address,uint256,bytes)';
    // pay tokens and buy some products in one tx
    const transferAndCallTx = payableToken
      .connect(buyer)
      [transferAndCallSig](tokenReceiver.address, tokenAmount, calldata);
    await expect(transferAndCallTx)
      .to.emit(tokenReceiver, 'PurchaseMade')
      .withArgs(buyer.address, tokenAmount, productAmount, color);
  });
});
