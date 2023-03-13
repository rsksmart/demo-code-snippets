import { mine } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Delegation, Delegate, Exploit } from '../typechain-types';

describe('Delegation', () => {
  let delegate: Delegate;
  let delegation: Delegation;
  let exploit: Exploit;

  async function deploy() {
    const [deployer] = await ethers.getSigners();
    // 1. deploy Delegate
    const DelegateFactory = await ethers.getContractFactory('Delegate');
    delegate = await DelegateFactory.deploy(deployer.address);
    await delegate.deployed();
    // 2. deploy Delegation
    const DelegationFactory = await ethers.getContractFactory('Delegation');
    delegation = await DelegationFactory.deploy(delegate.address);
    await delegation.deployed();
    // 3. deploy Exploit
    const ExploitFactory = await ethers.getContractFactory('Exploit');
    exploit = await ExploitFactory.deploy();
    await exploit.deployed();
  }

  before(deploy);

  it('deployer should be Delegate and Delegation owner', async () => {
    const [deployer] = await ethers.getSigners();
    expect(await delegate.owner()).to.equal(deployer.address);
    expect(await delegation.owner()).to.equal(deployer.address);
  });

  it(`Exploit s/c should seize Delegation ownership`, async () => {
    const seizeTx = await exploit.seizeOwnership(delegation.address);
    await seizeTx.wait();
    expect(await delegation.owner()).to.equal(exploit.address);
  });

  it(`Exploit s/c should seize Delegate ownership`, async () => {
    const seizeTx = await exploit.seizeOwnership(delegate.address);
    await seizeTx.wait();
    expect(await delegate.owner()).to.equal(exploit.address);
  });
});
