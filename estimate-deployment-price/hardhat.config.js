require('@nomiclabs/hardhat-waffle');
const {
  getDeploymentPrice,
  promptDeploymentPrice,
  checkDeployerBalance,
  deployMeowToken,
} = require('./utils');

const { mnemonic } = require('./.secret.json');

task('deploy', 'Deploy smart contracts', async () => {
  try {
    const totalSupply = 1e6;
    const deploymentPrice = await getDeploymentPrice('MeowToken', totalSupply);
    await promptDeploymentPrice(deploymentPrice);
    await checkDeployerBalance(deploymentPrice);
    const meowToken = await deployMeowToken(totalSupply);
    console.log(`Smart contract deployed to ${meowToken.address}`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
});

module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {},
    rskregtest: {
      chainId: 33,
      url: 'http://localhost:4444',
    },
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
    rskmainnet: {
      chainId: 30,
      url: 'https://public-node.rsk.co',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
  },
  mocha: {
    // 10 minutes
    timeout: 600000,
  },
};
