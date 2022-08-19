const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(name, ...params) {
  const ContractFactory = await ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...params);
  await contract.deployed();
  return contract;
}

describe('EOA vs Smart contract', () => {
  let restrictedAccess;
  let callerContract;

  before(async () => {
    restrictedAccess = await deployContract('RestrictedAccess');
    callerContract = await deployContract(
      'CallerContract',
      restrictedAccess.address,
    );
  });

  describe('Restrict access to either EOA or smart contract', () => {
    describe('EOA calls', () => {
      it(`EOA should be able to call a function allowed only for EOA.`, async () => {
        await expect(restrictedAccess.callEoaOnly()).to.emit(
          restrictedAccess,
          'CalledByEoa',
        );
      });
      it(`EOA should not be able to call a function allowed only for contracts.`, async () => {
        await expect(restrictedAccess.callContractOnly()).to.be.revertedWith(
          'Smart contracts only!',
        );
      });
    });
    describe('Contract calls', () => {
      it(`Contract should be able to call a function allowed only for contracts.`, async () => {
        await expect(callerContract.verifyCallContractOnly()).to.emit(
          restrictedAccess,
          'CalledByContract',
        );
      });
      it(`Contract should not be able to call a function allowed only for EOA.`, async () => {
        await expect(callerContract.verifyCallEoaOnly()).to.be.revertedWith(
          'EOA only!',
        );
      });
    });
  });
});
