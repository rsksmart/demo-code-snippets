const path = require('path');

module.exports = {
  meowTotalSupply: 1e6,
  frontendPaths: [
    path.join(__dirname, '../front-react/src/contracts'),
    path.join(__dirname, '../front/contracts'),
  ],
};
