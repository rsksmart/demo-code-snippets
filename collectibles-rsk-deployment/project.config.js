const path = require('path');

// Meow-nft project configuration
module.exports = {
  // path to a JSON file with Meow-nft s/c deployment addresses
  deploymentFile: path.join(__dirname, 'deployments.json'),
  // ipfs:// CIDs for the next NFTs to mint (leads to JSON metadata files)
  newCIDsToMint: [
    'QmaXZxVGYcCY36seYTVuGeY9mWchC1WjMscV1FLNfZsM3f',
    'QmR5mspowKw6B68QPSuYE9SGH1A6gPKxjdVRokhAZZh4LD',
  ],
};
