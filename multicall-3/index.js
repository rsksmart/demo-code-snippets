const { ethers } = require('ethers');
const { Multicall } = require('ethereum-multicall');
const RIF = require('./contracts/RIFToken.json');
const RDOC = require('./contracts/RDOC.json');
const Multicall3 = require('./contracts/Multicall3.json');

let web3Provider;
let chainId;
let multicall;
let walletAddress;
let rbtcBalance;
// RIF token
let rifBalance;
let rifDecimals;
let rifSupply;
// RDOC token
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

// connect Metamask and ethers.js
async function connectProvider() {
  await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
  chainId = (await web3Provider.getNetwork()).chainId;
  [walletAddress] = await web3Provider.listAccounts();
  multicall = new Multicall({
    ethersProvider: web3Provider,
    tryAggregate: true,
  });

  showDashboard();
}

function getResult(results, contract, method) {
  return ethers.BigNumber.from(
    results[contract].callsReturnContext.find(
      (call) => call.methodName === method,
    ).returnValues[0],
  );
}

async function makeMulticall() {
  // aggregate calls of different methods from different contracts into one call
  const aggregatedCall = [
    {
      reference: 'RIF',
      contractAddress: RIF.addresses[chainId].toLowerCase(),
      abi: RIF.abi,
      calls: [
        {
          methodName: 'balanceOf',
          methodParameters: [walletAddress],
        },
        {
          methodName: 'decimals',
        },
        {
          methodName: 'totalSupply',
        },
      ],
    },
    {
      reference: 'RDOC',
      contractAddress: RDOC.addresses[chainId].toLowerCase(),
      abi: RDOC.abi,
      calls: [
        {
          methodName: 'balanceOf',
          methodParameters: [walletAddress],
        },
        {
          methodName: 'decimals',
        },
        {
          methodName: 'totalSupply',
        },
      ],
    },
    {
      reference: 'Multicall3',
      contractAddress: Multicall3.addresses[chainId].toLowerCase(),
      abi: Multicall3.abi,
      calls: [
        {
          methodName: 'getEthBalance',
          methodParameters: [walletAddress],
        },
      ],
    },
  ];
  const { results } = await multicall.call(aggregatedCall);

  // extract values from the aggregated result
  rbtcBalance = getResult(results, 'Multicall3', 'getEthBalance');
  rifBalance = getResult(results, 'RIF', 'balanceOf');
  rifDecimals = getResult(results, 'RIF', 'decimals');
  rifSupply = getResult(results, 'RIF', 'totalSupply');
  rdocBalance = getResult(results, 'RDOC', 'balanceOf');
  rdocDecimals = getResult(results, 'RDOC', 'decimals');
  rdocSupply = getResult(results, 'RDOC', 'totalSupply');

  displayData();
}

function listenToProvider() {
  // make multicall call on every new block
  web3Provider.on('block', makeMulticall);
}

function listenToButtons() {
  document
    .getElementById('connect-wallet-button')
    .addEventListener('click', connectProvider);
  document
    .getElementById('track-balances-button')
    .addEventListener('click', listenToProvider);
}

listenToButtons();
