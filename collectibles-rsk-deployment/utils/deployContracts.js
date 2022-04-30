/* eslint-disable no-undef */
/**
 * Deploys smart contract to the selected network
 * @returns
 */
async function deployContracts() {
  const [deployer] = await ethers.getSigners();
  console.log('Deployer address: ', deployer.address);

  const deployerBalance = Number(
    ethers.utils.formatEther(
      await ethers.provider.getBalance(deployer.address),
    ),
  );
  console.log('Deployer balance: ', deployerBalance);
  if (deployerBalance === 0) throw new Error('Top up your account balance');

  const meowContractFactory = await ethers.getContractFactory('Meow');
  const meowNft = await meowContractFactory.deploy();

  await meowNft.deployed();

  return meowNft;
}

module.exports = deployContracts;
