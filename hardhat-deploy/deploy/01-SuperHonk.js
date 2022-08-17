module.exports = async ({ getUnnamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const [deployer] = await getUnnamedAccounts();
  await deploy('SuperHonk', {
    from: deployer,
    args: [],
    log: true,
  });
};
module.exports.tags = ['SuperHonk'];
