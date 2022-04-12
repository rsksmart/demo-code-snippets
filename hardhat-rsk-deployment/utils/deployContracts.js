require('dotenv').config();

async function deployContracts() {
  const meowContractFactory = await ethers.getContractFactory('MeowToken');
  const meowToken = await meowContractFactory.deploy(
    process.env.MEOW_TOTAL_SUPPLY,
  );
  await meowToken.deployed();

  const purrContractFactory = await ethers.getContractFactory('PurrNft');
  const purrNft = await purrContractFactory.deploy(meowToken.address);
  await purrNft.deployed();

  return [meowToken, purrNft];
}

module.exports = deployContracts;
