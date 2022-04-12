const deployContracts = require('../utils/deployContracts.js');

async function main() {
  try {
    const [deployer] = await ethers.getSigners();

    console.log('Deploying contracts with the account:', deployer.address);

    console.log('Account balance:', (await deployer.getBalance()).toString());

    const [meowToken, purrNft] = await deployContracts();

    console.log('Meow Token deployed at:', meowToken.address);
    console.log('Purr NFT deployed at:', purrNft.address);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
