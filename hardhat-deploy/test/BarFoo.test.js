const { ethers, deployments } = require('hardhat');
const { expect } = require('chai');

describe('Cars', () => {
  let bar;
  let foo;

  before(async () => {
    await deployments.fixture(['Bar', 'Foo']);
    bar = await ethers.getContract('Bar');
    foo = await ethers.getContract('Foo');
  });

  it('Bar is deployed', async () => {
    expect(bar.address).to.be.properAddress;
    expect(bar.address).not.to.equal(ethers.constants.AddressZero);
  });

  it('Foo is deployed', async () => {
    expect(foo.address).to.be.properAddress;
    expect(bar.address).not.to.equal(ethers.constants.AddressZero);
  });

  it('Bar address on Foo is set correctly', async () => {
    expect(await foo.bar()).to.equal(bar.address);
  });

  it('The message on Foo is set correctly', async () => {
    expect(await foo.message()).to.equal('Hello World!');
  });
});
