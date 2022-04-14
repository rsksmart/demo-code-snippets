const { deployContracts, writeArtifactToFrontend } = require('../utils');

async function main() {
  try {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account: ', deployer.address);

    console.log('Account balance: ', (await deployer.getBalance()).toString());

    // deploy contracts and generate Hardhat artifacts
    const [meowToken] = await deployContracts();

    console.log('Meow Token deployed at: ', meowToken.address);

    // write generated Hardhat artifacts and deployment address to the frontend s/c folder
    await writeArtifactToFrontend('MeowToken', meowToken.address);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
