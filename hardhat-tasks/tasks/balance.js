const { task } = require('hardhat/config');
const deployedTokens = require('../deployed-tokens.json');

const balanceOfSignature =
  'function balanceOf(address owner) view returns (uint)';

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
  // read token address from `deployed-tokens.json`
  const tokenAddress =
    deployedTokens[hre.network.name]?.[tokenName]?.toLowerCase();
  if (!tokenAddress) throw new Error(`Unknown token ${tokenName}`);
  console.log(`${tokenName} address: ${tokenAddress}`);
  // connect to deployed token contract
  const erc20 = await hre.ethers.getContractAt(
    [balanceOfSignature],
    tokenAddress,
  );
  // call the token's `balanceOf()` function
  const balance = hre.ethers.utils.formatEther(await erc20.balanceOf(address));
  console.log(`${tokenName} balance: ${balance}`);
}

/**
 * `balance` task
 * Custom Hardhat task to display RBTC and token balances balances
 */
module.exports = task('balance', 'Displays RBTC and token balances')
  /**
   * Optional command line parameters
   *
   * `wallet` allows user to specify wallet address to check balances
   * Usage: `npx hardhat balance --wallet 0xb42c26BB804987EE7FEFb897eB18ED775da19Fe4`
   * If `wallet` parameter is omitted, uses an address of the default signer
   *
   * `token` allows to select one of the tokens listed in `deployed-tokens.json`
   * Usage: `npx hardhat balance --token RIF` or `npx hardhat balance --token RDOC`
   * If `token` parameter is omitted, shows only RBTC balance
   */
  .addOptionalParam('wallet', 'Wallet address')
  .addOptionalParam('token', 'ERC20 token name')
  /**
   * Task Action
   */
  .setAction(async ({ wallet, token }) => {
    try {
      const address = await getWalletAddress(wallet);
      await printWalletBalance(address);
      // terminate the task if token name was not specified
      if (!token) return;
      await printTokenBalance(token, address);
    } catch (error) {
      console.log(error.message);
    }
  });
