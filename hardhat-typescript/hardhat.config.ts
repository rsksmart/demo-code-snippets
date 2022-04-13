import { task, HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  accounts.forEach((account) => console.log(account.address));
});

const config: HardhatUserConfig = {
  // Your type-safe config goes here
  solidity: '0.8.4',
  defaultNetwork: 'rskregtest',
  networks: {
    hardhat: {},
    rskregtest: {
      url: 'http://localhost:4444',
    },
  },
};

export default config;
