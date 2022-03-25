/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
const Token = artifacts.require('Token');
const { expect } = require('chai');
const chai = require('chai');
const { web3 } = require('hardhat');

const { BN } = web3.utils;
chai.use(require('chai-bn')(BN));
chai.use(require('chai-as-promised'));

// Traditional Truffle test
contract('Hardhat token', (accounts) => {
  const [owner, addr1, addr2] = accounts;
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let hardhatToken;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async () => {
    // To deploy our contract, we just have to call Token.new() and await
    // for it to be deployed, which happens once its transaction has been
    // mined.
    hardhatToken = await Token.new();
  });

  // `describe` is a Mocha function that allows you to organize your tests. It's
  // not actually needed, but having your tests organized makes debugging them
  // easier. All Mocha functions are available in the global scope.

  // `describe` receives the name of a section of your test suite, and a callback.
  // The callback must define the tests of that section. This callback can't be
  // an async function.
  describe('Deployment', () => {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.

    // If the callback function is async, Mocha will `await` it.
    it('Should set the right owner', async () => {
      // Expect receives a value, and wraps it in an Assertion object. These
      // objects have a lot of utility methods to assert values.

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      const tokenOwner = await hardhatToken.owner();
      expect(tokenOwner).to.equal(owner);
    });
    it('Should assign the total supply of tokens to the owner', async () => {
      const totalSupply = await hardhatToken.totalSupply();
      const ownerBalance = await hardhatToken.balanceOf(owner);
      expect(ownerBalance).to.be.a.bignumber.that.equals(totalSupply);
    });
  });

  describe('Transactions', () => {
    it('Should transfer tokens between accounts', async () => {
      const numOfTokensToTransfer = '50';
      // Transfer tokens from owner to addr1
      // we use the third function parameter to specify a sender
      await hardhatToken.transfer(addr1, numOfTokensToTransfer, {
        from: owner,
      });
      let addr1Balance = await hardhatToken.balanceOf(addr1);
      expect(addr1Balance).to.be.a.bignumber.that.equals(
        new BN(numOfTokensToTransfer),
      );

      // Transfer tokens from addr1 to addr2
      // we use the third function parameter to specify a sender
      await hardhatToken.transfer(addr2, numOfTokensToTransfer, {
        from: addr1,
      });
      const addr2Balance = await hardhatToken.balanceOf(addr2);
      expect(addr2Balance).to.be.a.bignumber.that.equals(
        new BN(numOfTokensToTransfer),
      );

      // now address 1 balance should be empty
      addr1Balance = await hardhatToken.balanceOf(addr1);
      expect(addr1Balance).to.be.a.bignumber.that.equals(new BN('0'));
    });

    it("Should fail if sender doesn't have enough tokens", async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner);

      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        hardhatToken.transfer(owner, 1, { from: addr1 }),
      ).to.eventually.be.rejectedWith();

      // Owner balance shouldn't have changed.
      await expect(
        hardhatToken.balanceOf(owner),
      ).to.eventually.be.a.bignumber.that.equals(initialOwnerBalance);
    });

    it('Should update balances after transfers', async () => {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner);

      // Transfer 100 tokens from owner to addr1.
      await hardhatToken.transfer(addr1, 100, { from: owner });

      // Transfer another 50 tokens from owner to addr2.
      await hardhatToken.transfer(addr2, 50, { from: owner });

      // Check balances.
      const finalOwnerBalance = await hardhatToken.balanceOf(owner);
      expect(finalOwnerBalance).to.be.a.bignumber.that.equals(
        initialOwnerBalance.sub(new BN('150')),
      );

      const addr1Balance = await hardhatToken.balanceOf(addr1);
      expect(addr1Balance).to.be.a.bignumber.that.equals(new BN('100'));

      const addr2Balance = await hardhatToken.balanceOf(addr2);
      expect(addr2Balance).to.be.a.bignumber.that.equals(new BN('50'));
    });
  });
});
