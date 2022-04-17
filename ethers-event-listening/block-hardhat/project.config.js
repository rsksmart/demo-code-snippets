// Demo project configuration variables

const path = require('path');

module.exports = {
  // test token total supply
  meowTotalSupply: 1e6,
  // Specify the frontend contracts full path. Can add multiple.
  // It will create folders if they don't exist
  frontendPaths: [path.join(__dirname, '../front/contracts')],
};
