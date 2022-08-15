/* eslint-disable no-unused-expressions */
const { ethers } = require('hardhat');
const { expect } = require('chai');
const {
  deployContract,
  getSaltForNiceAddress,
  hasLeadingZeros,
} = require('../utils');

describe('Calculate address', () => {
  let deployer;
  let factory;

  before(async () => {
    [deployer] = await ethers.getSigners();
    factory = await deployContract('ContractFactory');
  });

  it('Should predict Child address', async () => {
    const nonce = await ethers.provider.getTransactionCount(factory.address);
    const anticipatedAddress = ethers.utils.getContractAddress({
      from: factory.address,
      nonce,
    });
    const tx = await factory.deploy();
    await expect(tx)
      .to.emit(factory, 'ContractDeployed')
      .withArgs(deployer.address, anticipatedAddress);
  });

  it('Should deploy Child to the address starting with four zeros', async () => {
    const Child = await ethers.getContractFactory('Child');
    const { data: initCode } = Child.getDeployTransaction(deployer.address);
    const initCodeHash = ethers.utils.keccak256(initCode);
    const salt = getSaltForNiceAddress(factory.address, initCodeHash);
    const deployTx = await factory.deployCreate2(salt);
    const txReceipt = await deployTx.wait();
    const deployEvent = txReceipt.events.find(
      (event) => event.event === 'ContractDeployed',
    );
    expect(hasLeadingZeros(deployEvent.args.childContract)).to.be.true;
    console.log(
      `Picked up a salt '${salt}' such that the deployed s/c address is ${deployEvent.args.childContract}`,
    );
  });
});
