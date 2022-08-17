const { ethers, deployments } = require('hardhat');
const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('Cars', () => {
  async function deploy() {
    await deployments.fixture(['SuperHonk', 'Cars']);
    const cars = await ethers.getContract('Cars');
    return { cars };
  }

  it('has 1 car', async () => {
    const { cars } = await loadFixture(deploy);
    expect(await cars.numCars()).to.equal(1);
  });

  it('the car has the correct params', async () => {
    const { cars } = await loadFixture(deploy);
    const car = await cars.cars(1);
    expect(car.colour).to.equal('0xafafaf');
    expect(car.doors).to.equal(4);
    expect(car.status).to.equal(1);
  });
});
