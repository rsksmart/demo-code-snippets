const { readFileSync } = require('fs');

/**
 * Reads mnemonic phrase from a file `.secret` in the project root
 * @returns an array with 12 words of the mnemonic
 */
function readMnemonic() {
  const mnemonic = readFileSync('.secret', 'utf8').trim();
  if (!mnemonic || mnemonic.split(' ').length !== 12) {
    throw new Error('unable to retrieve mnemonic from .secret');
  }
  return mnemonic;
}

module.exports = readMnemonic;
