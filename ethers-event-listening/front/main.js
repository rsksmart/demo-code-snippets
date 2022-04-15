import {
  showPage,
  showError,
  displayEvent,
  showLoading,
  readInputFields,
} from './domFunctions.js';

let provider = null;
let meowToken = null;

/**
 * Transfers a certain amount of test tokens to a specified address.
 * `amount` and `address` are taken from the corresponding document input fields.
 */
async function transferTokens() {
  try {
    showError('');
    showLoading(true);
    const { meowAmount, toAddress } = readInputFields();
    const signer = await provider.getSigner();
    await meowToken.connect(signer).transfer(toAddress, meowAmount);
  } catch (error) {
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

/**
 * Creates deployed smart contract representation object
 * @param {string} name smart contract name
 * @returns smart contract object
 */
async function connectSmartContract(name) {
  if (!provider) throw new Error('Provider is not connected');
  // read contract data from a JSON file
  const response = await fetch(`./contracts/${name}.json`);
  if (!response.ok) throw new Error(response.statusText);
  const { address, abi } = await response.json();
  // connect to smart contract
  const smartContract = new ethers.Contract(address, abi, provider);
  const signer = await provider.getSigner();
  // filter transfers `from:` and `to:` signer
  const filter = smartContract.filters.Transfer(signer.address, signer.address);
  // attach Transfer event listener
  smartContract.on(filter, displayEvent);
  return smartContract;
}

/**
 * Connects Ethers.js and Metamask
 */
async function connectProvider() {
  try {
    showError('');
    showLoading(true);
    // ensure Metamask is installed
    if (!window.ethereum) throw new Error('You should enable Metamask');
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum);
    // MetaMask requires requesting permission to connect users accounts
    await provider.send('eth_requestAccounts', []);
    meowToken = await connectSmartContract('MeowToken');
    showPage(true);
  } catch (error) {
    showPage(false);
    showError(error.message);
  } finally {
    showLoading(false);
  }
}

/**
 * Disconnects Metamask and Ethers.js
 */
function disconnectProvider() {
  provider = null;
  showPage(false);
}

/**
 * Attaches click listeners to buttons
 */
function attachEventListeners() {
  document
    .getElementById('connect-button')
    .addEventListener('click', connectProvider);
  document
    .getElementById('disconnect-button')
    .addEventListener('click', disconnectProvider);
  document
    .getElementById('transfer-button')
    .addEventListener('click', transferTokens);
}

document.addEventListener('DOMContentLoaded', attachEventListeners);
