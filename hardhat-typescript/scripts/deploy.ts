import { ethers, run } from 'hardhat';
import { meowTotalSupply } from '../constants';

async function main() {
  try {
    // compile and generate TypeScript typings
    await run('compile');
    const [deployer] = await ethers.getSigners();

    console.log('Deploying from address: ', deployer.address);

    const totalSupply = ethers.BigNumber.from(meowTotalSupply);
    const meowContractFactory = await ethers.getContractFactory('MeowToken');
    const meowToken = await meowContractFactory
      .connect(deployer)
      .deploy(totalSupply);

    await meowToken.deployed();

    console.log('Meow token deployed to:', meowToken.address);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
