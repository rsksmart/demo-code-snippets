const { ethers } = require('ethers');
const { providers } = require('@0xsequence/multicall');
const RIF = require('./contracts/RIFToken.json');
const RDOC = require('./contracts/RDOC.json');
const multicallConfig = require('./multicall-config.js');

let web3Provider;
let multicallProvider;
let chainId;
let walletAddress;
let rbtcBalance;
// RIF token
let rif;
let rifBalance;
let rifDecimals;
let rifSupply;
// RDOC token
let rdoc;
let rdocBalance;
let rdocDecimals;
let rdocSupply;

function showDashboard() {
  document.getElementById('connect-prompt').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
}

function displayData() {
  document.getElementById('wallet-address').innerHTML = walletAddress;
  document.getElementById('rbtc-balance').innerHTML =
    ethers.utils.formatEther(rbtcBalance);
  const rifDenominator = ethers.BigNumber.from(10).pow(rifDecimals);
  document.getElementById('rif-balance').innerHTML =
    rifBalance.div(rifDenominator);
  document.getElementById('rif-decimals').innerHTML = rifDecimals;
  document.getElementById('rif-supply').innerHTML =
    rifSupply.div(rifDenominator);
  const rdocDenominator = ethers.BigNumber.from(10).pow(rdocDecimals);
  document.getElementById('rdoc-balance').innerHTML =
    rdocBalance.div(rdocDenominator);
  document.getElementById('rdoc-decimals').innerHTML = rdocDecimals;
  document.getElementById('rdoc-supply').innerHTML =
    rdocSupply.div(rdocDenominator);
}

function connectSmartContracts() {
  // connect to RIF token smart contract
  rif = new ethers.Contract(
    RIF.addresses[chainId].toLowerCase(),
    RIF.abi,
    // connect s/c to multicall provider instead of web3 provider
    // to be able make aggregated calls
    multicallProvider,
  );
  // connect RDOC token smart contract
  rdoc = new ethers.Contract(
    RDOC.addresses[chainId].toLowerCase(),
    RDOC.abi,
    multicallProvider,
  );
}

// connect Metamask, ethers.js and Multicall providers
async function connectProviders() {
  await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  [walletAddress] = await web3Provider.listAccounts();
  chainId = (await web3Provider.getNetwork()).chainId;
  const config = multicallConfig[chainId];
  if (!config)
    throw new Error(`Unknown multicall config for the chain ${chainId}`);
  multicallProvider = new providers.MulticallProvider(web3Provider, config);
  connectSmartContracts();

  showDashboard();
}

async function makeAggregatedCall() {
  // construct aggregated call
  // all function calls are made via multicall provider
  const aggregatedCall = [
    multicallProvider.getBalance(walletAddress),
    rif.balanceOf(walletAddress),
    rif.decimals(),
    rif.totalSupply(),
    rdoc.balanceOf(walletAddress),
    rdoc.decimals(),
    rdoc.totalSupply(),
  ];
  [
    rbtcBalance,
    rifBalance,
    rifDecimals,
    rifSupply,
    rdocBalance,
    rdocDecimals,
    rdocSupply,
  ] = await Promise.all(aggregatedCall);

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
