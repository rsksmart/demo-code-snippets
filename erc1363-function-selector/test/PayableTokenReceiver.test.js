const { expect } = require('chai');
const { ethers } = require('hardhat');

async function deployContract(name, ...params) {
  const ContractFactory = await ethers.getContractFactory(name);
  const contract = await ContractFactory.deploy(...params);
  await contract.deployed();
  return contract;
}

describe('PayableToken & PayableTokenReceiver', () => {
  let deployer;
  let payableToken;
  let payableTokenReceiver;
  const transferAndCallSignature = 'transferAndCall(address,uint256,bytes)';

  before(async () => {
    [deployer] = await ethers.getSigners();
    payableToken = await deployContract('PayableToken');
    payableTokenReceiver = await deployContract(
      'PayableTokenReceiver',
      payableToken.address,
    );
  });

  it('Should encode UINT value, call method A and catch event A', async () => {
    const tokenAmount = 88;
    const uintValue = 99;
    const methodASelector =
      payableTokenReceiver.interface.getSighash('methodA');
    const encodedData = ethers.utils.defaultAbiCoder.encode(
      ['bytes4', 'uint256'],
      [methodASelector, uintValue],
    );
    const tx = payableToken[transferAndCallSignature](
      payableTokenReceiver.address,
      tokenAmount,
      encodedData,
    );
    await expect(tx)
      .to.emit(payableTokenReceiver, 'EventA')
      .withArgs(deployer.address, tokenAmount, uintValue);
  });

  it('Should encode BYTES3 value, call method B and catch event B', async () => {
    const tokenAmount = 88;
    const bytes3Value = '0xfafafa';
    const methodASelector =
      payableTokenReceiver.interface.getSighash('methodB');
    const encodedData = ethers.utils.defaultAbiCoder.encode(
      ['bytes4', 'bytes3'],
      [methodASelector, bytes3Value],
    );
    const tx = await payableToken[transferAndCallSignature](
      payableTokenReceiver.address,
      tokenAmount,
      encodedData,
    );
    await tx.wait();
    await expect(tx)
      .to.emit(payableTokenReceiver, 'EventB')
      .withArgs(deployer.address, tokenAmount, bytes3Value);
  });

  it('Should encode STRING value, call method C and catch event C', async () => {
    const tokenAmount = 88;
    const stringValue = 'Hello World!';
    const methodASelector =
      payableTokenReceiver.interface.getSighash('methodC');
    const encodedData = ethers.utils.defaultAbiCoder.encode(
      ['bytes4', 'string'],
      [methodASelector, stringValue],
    );
    const tx = await payableToken[transferAndCallSignature](
      payableTokenReceiver.address,
      tokenAmount,
      encodedData,
    );
    await tx.wait();
    await expect(tx)
      .to.emit(payableTokenReceiver, 'EventC')
      .withArgs(deployer.address, tokenAmount, stringValue);
  });
});
