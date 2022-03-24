/* eslint-disable import/no-extraneous-dependencies */
require('@nomiclabs/hardhat-truffle5');

module.exports = {
  solidity: '0.7.3',
  networks: {
    hardhat: {},
    rskregtest: {
      url: 'http://localhost:4444',
    },
  },
};
