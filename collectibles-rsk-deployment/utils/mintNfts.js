/* eslint-disable no-undef */
const { newCIDsToMint } = require('../project.config.js');
const getDeployedAddress = require('./getDeployedAddress.js');

/**
 * Sends transactions one by one
 * @param {*} deployedNft object representing the deployed s/c
 * @param {string} minterAddress minted NFTs owner (minter) address
 */
async function mintSequentially(deployedNft, minterAddress) {
  const cid = newCIDsToMint.shift();
  if (cid) {
    const tx = await deployedNft.mintNFT(minterAddress, `ipfs://${cid}`);
    await tx.wait();
    await mintSequentially(deployedNft, minterAddress);
  }
}

/**
 * Mints new CIDs from `project.config.js` to deployed Meow-NFT s/c
 */
async function mintNfts() {
  const [signer] = await ethers.getSigners();
  const deployedAddress = await getDeployedAddress();
  const meowContractFactory = await ethers.getContractFactory('Meow');
  const meowNft = new ethers.Contract(
    deployedAddress,
    meowContractFactory.interface,
    signer,
  );
  const mintedCIDs = newCIDsToMint.join(', ');
  await mintSequentially(meowNft, signer.address);
  console.log('Minted new NFT collectibles with CIDs: ', mintedCIDs);
}

module.exports = mintNfts;
