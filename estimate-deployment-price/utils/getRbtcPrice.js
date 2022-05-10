const axios = require('axios').default;

/**
 * Fetches Coingecko for the current RBTC / fiat rate
 * @param {string} currency fiat currency symbol
 * @returns {Promise<number>} current RBTC / fiat rate
 */
async function getRbtcPrice(currency = 'usd') {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/rootstock',
  );
  const rbtcPrice = response.data.market_data.current_price[currency];
  if (!rbtcPrice) throw new Error(`Can't get ${currency} price for RBTC.`);
  return rbtcPrice;
}

module.exports = getRbtcPrice;
