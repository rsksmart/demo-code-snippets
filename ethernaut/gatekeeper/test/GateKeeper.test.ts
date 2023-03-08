import { expect } from 'chai';
import { ethers } from 'hardhat';
import { GateKeeper } from '../typechain-types';

describe('GateKeeper', function () {
  let gateKeeper: GateKeeper;

  async function deploy() {
    const GateKeeperFactory = await ethers.getContractFactory('GateKeeper');
    gateKeeper = await GateKeeperFactory.deploy();
  }

  before(deploy);

  it('entrant should not be set on GateKeeper', async () => {
    expect(await gateKeeper.entrant()).to.equal(ethers.constants.AddressZero);
  });

  it('entrant should pass through the GateKeeper', async () => {
    const [deployer] = await ethers.getSigners();
    const ExploitFactory = await ethers.getContractFactory('Exploit');
    const exploit = await ExploitFactory.deploy(gateKeeper.address);
    await exploit.deployed();
    expect(await gateKeeper.entrant()).to.equal(deployer.address);
  });
});
