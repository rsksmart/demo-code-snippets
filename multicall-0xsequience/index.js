const { ethers } = require('ethers');
const { providers } = require('@0xsequence/multicall');
const RifToken = require('./contracts/31/RIFToken.json');

const multicallConfig = {
  // RSK Testnet
  31: {
    // maximum number of calls to batch into a single JSON-RPC call
    batchSize: 50,
    // defines the time each call is held on buffer waiting for subsequent calls before aggregation, ms
    timeWindow: 50,
    /* 
    0xsequience MultiCall
    https://github.com/0xsequence/wallet-contracts/blob/master/src/contracts/modules/utils/MultiCallUtils.sol
    deployed at RSK Testnet
    https://explorer.testnet.rsk.co/address/0xb39d1dea1bf91aef02484f677925904b9d6936b4?__ctab=Code
    */
    contract: '0xb39d1Dea1bF91Aef02484F677925904b9d6936B4',
  },
};

let web3Provider;
let multicallProvider;
let walletAddress;
let rbtcBalance;
let rifBalance;
let rifDecimals;
let rifSupply;

function showDashboard() {
  document.getElementById('connect-prompt').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
}

function displayData() {
  const rifDenominator = ethers.BigNumber.from(10).pow(rifDecimals);
  document.getElementById('wallet-address').innerHTML = walletAddress;
  document.getElementById('rbtc-balance').innerHTML =
    ethers.utils.formatEther(rbtcBalance);
  document.getElementById('rif-balance').innerHTML =
    rifBalance.div(rifDenominator);
  document.getElementById('rif-decimals').innerHTML = rifDecimals;
  document.getElementById('rif-supply').innerHTML =
    rifSupply.div(rifDenominator);
}

// connect Metamask, ethers.js and Multicall providers
async function connectProviders() {
  await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  [walletAddress] = await web3Provider.listAccounts();
  const { chainId } = await web3Provider.getNetwork();
  const config = multicallConfig[chainId];
  if (!config)
    throw new Error(`Unknown multicall config for the chain ${chainId}`);
  multicallProvider = new providers.MulticallProvider(web3Provider, config);

  showDashboard();
}

async function makeAggregatedCall() {
  // connect to RIF token smart contract
  const rifToken = new ethers.Contract(
    RifToken.address.toLowerCase(),
    RifToken.abi,
    // connect s/c to multicall provider instead of web3 provider
    // to be able make aggregated calls
    multicallProvider,
  );

  // construct aggregated call
  // all function calls are made via multicall provider
  const aggregatedCall = [
    multicallProvider.getBalance(walletAddress),
    rifToken.balanceOf(walletAddress),
    rifToken.decimals(),
    rifToken.totalSupply(),
  ];
  [rbtcBalance, rifBalance, rifDecimals, rifSupply] = await Promise.all(
    aggregatedCall,
  );

  displayData();
}

function listenToProvider() {
  // make aggregated call on every new block
  web3Provider.on('block', makeAggregatedCall);
}

function listenToButtons() {
  document
    .getElementById('connect-wallet-button')
    .addEventListener('click', connectProviders);
  document
    .getElementById('track-balances-button')
    .addEventListener('click', listenToProvider);
}

listenToButtons();
