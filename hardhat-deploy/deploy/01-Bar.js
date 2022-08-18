module.exports = async ({ getUnnamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const [deployer] = await getUnnamedAccounts();
  await deploy('Bar', {
    from: deployer,
    log: true,
  });
};
module.exports.tags = ['Bar'];
