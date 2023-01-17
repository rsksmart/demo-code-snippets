import { expect } from 'chai';
import { BigNumberish } from 'ethers';
import { ethers } from 'hardhat';
import { BasicToken__factory } from '../typechain-types';

async function getBasicTokenBytecode(initialSupply: BigNumberish) {
  // basic token contract factory
  const BasicTokenFactory: BasicToken__factory =
    await ethers.getContractFactory('BasicToken');

  // deployment transaction data field (deployment bytecode)
  const deploymentBytecode =
    BasicTokenFactory.getDeployTransaction(initialSupply).data!.toString();

  // bytecode length excluding constructor arg length of 32 bytes (64 symbols)
  const bytecodeLength = deploymentBytecode.length - 64;

  // bytecode excluding constructor arg
  const bytecode = deploymentBytecode.substring(0, bytecodeLength);

  const constructorArg = deploymentBytecode.substring(bytecodeLength);
  return {
    bytecode,
    constructorArg,
  };
}

describe('Bytecode constructor arguments', function () {
  // bytecodes excluding constructor arguments
  const bytecodes: string[] = [];

  it(`should find contructor argument '10000' at the end of the bytecode`, async function () {
    const initialSupply = 10000;

    const { bytecode, constructorArg } = await getBasicTokenBytecode(
      initialSupply,
    );
    // store bytecode to compare later
    bytecodes.push(bytecode);

    expect(parseInt(constructorArg, 16)).to.equal(initialSupply);
  });

  it(`should find contructor argument '9999999' at the end of the bytecode`, async function () {
    const initialSupply = 9999999;

    const { bytecode, constructorArg } = await getBasicTokenBytecode(
      initialSupply,
    );
    bytecodes.push(bytecode);

    expect(parseInt(constructorArg, 16)).to.equal(initialSupply);
  });

  it('bytecodes excluding constructor arguments should be identical', async function () {
    expect(
      bytecodes.every((bytecode) => bytecode && bytecode === bytecodes[0]),
    );
  });
});
