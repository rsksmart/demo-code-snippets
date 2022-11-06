const { ethers } = require('ethers');
const { Multicall } = require('ethereum-multicall');
const RifToken = require('./contracts/31/RIFToken.json');
const Multicall3 = require('./contracts/31/Multicall3.json');

let web3Provider;
let multicall;
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

// connect Metamask and ethers.js
async function connectProvider() {
  await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  web3Provider = new ethers.providers.Web3Provider(window.ethereum);
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
      contractAddress: RifToken.address.toLowerCase(),
      abi: RifToken.abi,
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
      contractAddress: Multicall3.address.toLowerCase(),
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
