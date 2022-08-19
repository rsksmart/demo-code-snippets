const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(name, ...params) {
  const ContractFactory = await ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...params);
  await contract.deployed();
  return contract;
}

describe('EOA vs Smart contract', () => {
  let callee;
  let caller;

  before(async () => {
    callee = await deployContract('Callee');
    caller = await deployContract('Caller', callee.address);
  });

  describe('Verification by (tx.origin == msg.sender)', () => {
    describe('EOA calls', () => {
      it(`EOA should be able to call a function allowed only for EOA. Check by tx origin`, async () => {
        await expect(callee.verifyEoaCallOrigin())
          .to.emit(callee, 'CalledByEoa')
          .withArgs('verifyEoaCallOrigin');
      });
      it(`EOA should not be able to call a function allowed only for contracts. Check by tx origin`, async () => {
        await expect(callee.verifyContractCallOrigin()).to.be.revertedWith(
          'Smart contracts only! tx.origin should not equal msg.sender',
        );
      });
    });
    describe('Contract calls', () => {
      it(`Contract should be able to call a function allowed only for contracts. Check by tx origin`, async () => {
        await expect(caller.contractCallOrigin())
          .to.emit(callee, 'CalledByContract')
          .withArgs('verifyContractCallOrigin');
      });
      it(`Contract should not be able to call a function allowed only for EOA. Check by tx origin`, async () => {
        await expect(caller.eoaCallOrigin()).to.be.revertedWith(
          'EOA only! tx.origin should equal msg.sender',
        );
      });
    });
  });
  describe('Verification by (external code > 0)', () => {
    describe('EOA calls', () => {
      it(`EOA should be able to call a function allowed only for EOA. Check by external code`, async () => {
        await expect(callee.verifyEoaCallExtCode())
          .to.emit(callee, 'CalledByEoa')
          .withArgs('verifyEoaCallExtCode');
      });
      it(`EOA should not be able to call a function allowed only for contracts. Check by external code`, async () => {
        await expect(callee.verifyContractCallExtCode()).to.be.revertedWith(
          'Smart contracts only! You dont have an external code but you should',
        );
      });
    });
    describe('Contract calls', () => {
      it(`Contract should be able to call a function allowed only for contracts. Check by external code`, async () => {
        await expect(caller.contractCallExtCode())
          .to.emit(callee, 'CalledByContract')
          .withArgs('verifyContractCallExtCode');
      });
      it(`Contract should not be able to call a function allowed only for EOA. Check by external code`, async () => {
        await expect(caller.eoaCallExtCode()).to.be.revertedWith(
          'EOA only! EOA should not have ext code, but you have',
        );
      });
    });
  });
  describe('Bypass EOA verification by checking external code size', () => {
    it(`Should able be to call EOA only function by smart contract from the constructor during the deployment`, async () => {
      const receipt = await deployContract('Exploit1', callee.address);
      /* const txHash = receipt.deployTransaction.hash;
      const tx = await ethers.provider.getTransaction(txHash); */
      console.log(receipt);
    });
  });
});
