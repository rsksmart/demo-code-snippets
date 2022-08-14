async function deployContract(name, ...params) {
  const ContractFactory = await hre.ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...params);
  await contract.deployed();
  console.log(
    `'${name}' was deployed on ${hre.network.name} with address ${contract.address}`,
  );
  return contract;
}

function hasLeadingZeros(address = '0x0', zeros = 4) {
  for (let i = 2; i <= zeros + 1; i += 1) {
    if (address.charAt(i) !== '0') return false;
  }
  return true;
}

function getSaltForNiceAddress(deployerAddress, initCodeHash) {
  let salt = 0;
  let niceAddress = '';
  let saltHash;
  while (!hasLeadingZeros(niceAddress)) {
    salt += 1;
    saltHash = ethers.utils.keccak256(salt);
    niceAddress = ethers.utils.getCreate2Address(
      deployerAddress,
      saltHash,
      initCodeHash,
    );
  }
  return saltHash;
}

module.exports = {
  hasLeadingZeros,
  getSaltForNiceAddress,
  deployContract,
};
