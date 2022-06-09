/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { ethers } = require('hardhat');

async function sendMoney(sender, address, amount) {
  const txData = {
    to: address,
    value: amount,
  };
  const tx = await sender.sendTransaction(txData);
  await tx.wait();
  return tx;
}

describe('Demo', () => {
  let deployer;
  let buyer;
  let demo;

  const moneyToSend = 999999;

  before(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const Demo = await ethers.getContractFactory('Demo');
    demo = await Demo.connect(deployer).deploy();
    await demo.deployed();
  });

  describe('upon deployment', () => {
    it('should have a proper address', async () => {
      expect(demo.address).to.be.properAddress;
    });
  });

  describe('sending money to demo sc', () => {
    let sendMoneyTx;

    before(async () => {
      sendMoneyTx = await sendMoney(deployer, demo.address, moneyToSend);
    });

    it('should top up SC balance', async () => {
      /* const balance = await demo.balance();
      expect(balance).to.equal(moneyToSend); */
      // the same as above
      await expect(sendMoneyTx).to.changeEtherBalance(demo, moneyToSend);
    });

    it("should be able to send money to the s/c invoking the 'receive' function", async () => {
      // event Paid(address indexed _from, address indexed _to, uint _amount, uint _timestamp);
      const { timestamp } = await ethers.provider.getBlock(
        sendMoneyTx.blockNumber,
      );
      await expect(sendMoneyTx)
        .to.emit(demo, 'Paid')
        // regtest doesnt's provide a correct time stamp
        .withArgs(deployer.address, demo.address, moneyToSend, timestamp);
    });
  });

  describe('withdraw money from the demo sc', () => {
    it('owner should be able to withdraw', async () => {
      // regtest reverts this transaction
      const tx = await demo.withdraw(buyer.address);
      await tx.wait();
      await expect(tx).to.changeEtherBalances(
        [demo, buyer],
        [-moneyToSend, moneyToSend],
      );
    });

    it('not owner should not be able to withdraw', async () => {
      const tx = demo
        .connect(buyer)
        .withdraw(buyer.address)
        .then((res) => res.wait());
      await expect(tx).to.be.reverted;
    });
  });
});
