module.exports = async ({ getUnnamedAccounts, deployments, ethers }) => {
  const { deploy, get } = deployments;
  const [deployer] = await getUnnamedAccounts();

  // find the deployed SuperHonk smart contract data
  const bar = await get('Bar');
  // deploying smart contract
  await deploy('Foo', {
    from: deployer,
    args: [bar.address],
    log: true,
  });

  // if needed call some function on the contract right after the deployment
  const cars = await ethers.getContract('Foo');
  const message = 'Hello World!';
  await (await cars.setMessage(message)).wait();
  console.log(`Message "${message}" has been set on Foo`);
};
module.exports.tags = ['Foo'];
