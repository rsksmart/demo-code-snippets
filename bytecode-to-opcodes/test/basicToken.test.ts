import { expect } from 'chai';
import { ethers } from 'hardhat';
import { BasicToken__factory } from '../typechain-types';
import { disassemble, Bytecode } from '@ethersproject/asm';

describe('Basic token', () => {
  let bytecode: Bytecode;

  before(async () => {
    const BasicTokenFactory: BasicToken__factory =
      await ethers.getContractFactory('BasicToken');
    const bytecodeString = BasicTokenFactory.bytecode;
    bytecode = disassemble(bytecodeString);
  });

  // opcodes list and description https://ethervm.io/#opcodes

  it('Opcode 000 should be PUSH1 80', async () => {
    const operation = bytecode[0];
    expect(operation.offset).to.equal(0); // line number
    expect(operation.opcode.mnemonic).to.equal('PUSH1'); // mnemonic name
    expect(operation.pushValue).to.equal('0x80'); // push argument
    expect(operation.length).to.equal(2); // 2 bytes
  });

  it('Opcode 002 should be PUSH1 40', async () => {
    const operation = bytecode[1];
    expect(operation.offset).to.equal(2); // line number
    expect(operation.opcode.mnemonic).to.equal('PUSH1'); // mnemonic name
    expect(operation.pushValue).to.equal('0x40'); // push argument
    expect(operation.length).to.equal(2); // 2 bytes
  });

  it('Opcode 004 should be MSTORE', async () => {
    const operation = bytecode[2];
    expect(operation.offset).to.equal(4); // line number
    expect(operation.length).to.equal(1); // 1 byte
    expect(operation.opcode.mnemonic).to.equal('MSTORE'); // mnemonic name
  });
});
