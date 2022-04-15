/**
 * Displays Error message on the page
 * @param {string} message error message. Empty string hides the error message
 */
export function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.style.display = message ? 'block' : 'none';
  errorDiv.innerHTML = message ?? '';
  if (message) console.error(message);
}

/**
 * Displays 'Loading...' message on the page
 * @param {boolean} show `true` shows the message, `false` hides
 */
export function showLoading(show = true) {
  document.getElementById('loading').style.display = show ? 'block' : 'none';
}

/**
 * Switches between provider connect button and token tranfer prompt
 * @param {boolean} show `true` shows transfer input fields, `false` shows
 * connect button
 */
export function showPage(show = true) {
  const providerConnectedDiv = document.getElementById('provider-connected');
  const providerDisconnectedDiv = document.getElementById(
    'provider-disconnected',
  );
  providerConnectedDiv.style.display = show ? 'block' : 'none';
  providerDisconnectedDiv.style.display = show ? 'none' : 'block';
}

/**
 * Displays Transfer event information on the page. Hides after few seconds
 * @param {string} from sender address
 * @param {string} to receiver address
 * @param {bignumber} amount token amount
 */
export function displayEvent(from, to, amount) {
  const eventDiv = document.getElementById('event');
  eventDiv.style.display = 'block';
  document.getElementById('event-from').innerHTML = from;
  document.getElementById('event-to').innerHTML = to;
  document.getElementById('event-amount').innerHTML = amount.toString();
  setTimeout(() => {
    eventDiv.style.display = 'none';
  }, 5000);
}

/**
 * Reads token amount and to-address from the input fields
 * @returns token amount and to-address
 */
export function readInputFields() {
  const meowAmount = document.getElementById('meow-amount').value;
  const toAddress = document.getElementById('to-address').value;
  return { meowAmount, toAddress };
}
