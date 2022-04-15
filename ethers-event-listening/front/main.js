import { showPage, showError, displayEvent } from './functions.js';

let provider = null;
const lunaToken = null;

const meowAmountInput = document.getElementById('meow-amount');
const toAddressInput = document.getElementById('to-address');
const transferButton = document.getElementById('transfer-button');

const loadingDiv = document.getElementById('loading');

async function connectSmartContract(name) {
  const response = await fetch(`./contracts/${name}.json`);
  if (!response.ok) throw new Error(response.statusText);
  const { address, abi } = await response.json();
  const smartContract = new ethers.Contract(address, abi, provider);
  const signer = await provider.getSigner();
  // filter transfers `from:` and `to:` signer
  const filter = smartContract.filters.Transfer(signer.address, signer.address);
  // attach Transfer event listener
  smartContract.on(filter, displayEvent);
}

async function connectProvider() {
  try {
    showError('');
    // ensure Metamask is installed
    if (!window.ethereum) throw new Error('You should enable Metamask');
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
    // MetaMask requires requesting permission to connect users accounts
    await ethersProvider.send('eth_requestAccounts', []);
    provider = ethersProvider;
    await connectSmartContract('MeowToken');
    showPage(true);
  } catch (error) {
    showPage(false);
    showError(error.message);
  }
}

function disconnectProvider() {
  provider = null;
  showPage(false);
}

document
  .getElementById('connect-button')
  .addEventListener('click', connectProvider);
document
  .getElementById('disconnect-button')
  .addEventListener('click', disconnectProvider);
