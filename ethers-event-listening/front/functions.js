/* eslint-disable no-undef */
export function showError(message) {
  const errorDiv = document.getElementById('error');
  errorDiv.style.display = message ? 'block' : 'none';
  errorDiv.innerHTML = message ?? '';
  if (message) console.error(message);
}

export function showPage(show = true) {
  const providerConnectedDiv = document.getElementById('provider-connected');
  const providerDisconnectedDiv = document.getElementById(
    'provider-disconnected',
  );
  providerConnectedDiv.style.display = show ? 'block' : 'none';
  providerDisconnectedDiv.style.display = show ? 'none' : 'block';
}

export function displayEvent(from, to, amount) {
  const eventDiv = document.getElementById('event');
  if (from && to && amount) {
    eventDiv.style.display = 'block';
    document.getElementById('event-from').innerHTML = from;
    document.getElementById('event-to').innerHTML = to;
    document.getElementById('event-amount').innerHTML = amount.toString();
  } else {
    eventDiv.style.display = 'none';
  }
}
