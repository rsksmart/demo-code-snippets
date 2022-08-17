module.exports = async ({ getUnnamedAccounts, deployments, ethers }) => {
  const { deploy, get } = deployments;
  const [deployer] = await getUnnamedAccounts();

  // find the deployed SuperHonk smart contract data
  const superHonk = await get('SuperHonk');
  // deploying smart contract
  await deploy('Cars', {
    from: deployer,
    args: [superHonk.address],
    log: true,
  });

  // if needed calling some function on the contract right after the deployment
  const cars = await ethers.getContract('Cars');
  const colour = '0xafafaf';
  const doors = 4;
  const value = ethers.utils.parseEther('0.0000011');
  const tx = await cars.addCar(colour, doors, { value });
  await tx.wait();
  console.log(
    `Added a new car of the ${colour} colour, having ${doors} doors and paid ${value} wei`,
  );
};
module.exports.tags = ['Cars'];
