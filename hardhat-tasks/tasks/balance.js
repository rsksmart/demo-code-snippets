const { task } = require('hardhat/config');
const deployedTokens = require('../deployed-tokens.json');

async function getWalletAddress(wallet) {
  // get address from the command line or set the default if not specified
  const walletAddress = wallet || (await hre.ethers.provider.listAccounts())[0];
  console.log(`Network name: ${hre.network.name}`);
  console.log(`Wallet: ${walletAddress}`);
  return walletAddress;
}

async function printWalletBalance(address) {
  const balanceWei = await hre.ethers.provider.getBalance(address);
  const balanceRbtc = hre.ethers.utils.formatEther(balanceWei);
  console.log(`RBTC balance: ${balanceRbtc}`);
}

async function printTokenBalance(tokenName, address) {
  // read token address from JSON file
  const tokenAddress =
    deployedTokens[hre.network.name]?.[tokenName]?.toLowerCase();
  if (!tokenAddress) throw new Error(`Unknown token ${tokenName}`);
  console.log(`${tokenName} address: ${tokenAddress}`);
  const token = await hre.ethers.getContractAt(tokenName, tokenAddress);
  const balance = hre.ethers.utils.formatEther(await token.balanceOf(address));
  console.log(`${tokenName} balance: ${balance}`);
}

// custom Hardhat task to display RBTC and token balances balances
module.exports = task('balance', 'Displays RBTC and token balances')
  // optional command line parameters
  .addOptionalParam('wallet', 'Wallet address')
  .addOptionalParam('token', 'ERC20 token name')
  // what the task actually does
  .setAction(async ({ wallet, token }, hre) => {
    try {
      const address = await getWalletAddress(wallet);
      await printWalletBalance(address);
      // continue the task if token name was specified
      if (!token) return;
      // run `compile` Hardhat task to create token artifacts
      await hre.run('compile');
      await printTokenBalance(token, address);
    } catch (error) {
      console.log(error.message);
    }
  });
