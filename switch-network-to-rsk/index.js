import { rskTestnet, rskMainnet } from './networks.js';

async function connectProviderTo(network) {
  try {
    // TODO: implement request accounts

    await switchToNetwork(network);
    showPage(network.chainName, address);
  } catch (error) {
    showError(error.message);
  }
}

// see details in Metamask documentation:
// https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain
async function switchToNetwork(network) {
  // TODO: implement network switching

  // make sure we switched
  const chainId = await window.ethereum.request({ method: 'eth_chainId' });
  if (chainId !== network.chainId)
    throw new Error(`Could not connect to ${network.chainName}`);
}

async function showPage(chainName, address) {
  document.getElementById('connect-prompt').classList.add('hidden');
  document.getElementById('connected').classList.remove('hidden');
  document.getElementById('chain-name').innerHTML = chainName;
  document.getElementById('wallet-address').innerHTML = address;
}

function showError(message = '') {
  document.getElementById('error').innerHTML = message;
  if (!message) return;
  // hide error message in 3 seconds
  setTimeout(() => showError(''), 3000);
}

// add click event listeners to the Connect buttons
document
  .getElementById('connect-testnet')
  .addEventListener('click', () => connectProviderTo(rskTestnet));
document
  .getElementById('connect-mainnet')
  .addEventListener('click', () => connectProviderTo(rskMainnet));
