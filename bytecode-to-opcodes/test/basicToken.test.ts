import { expect } from 'chai';
import { getBytecode, getOpcodes } from '../opcodes';

describe('Basic token', () => {
  it('Opcode 000 should be PUSH1 80', async () => {
    const bytecode = await getBytecode('BasicToken');
    const operation = bytecode[0];
    expect(operation.offset).to.equal(0); // line number
    expect(operation.opcode.mnemonic).to.equal('PUSH1'); // mnemonic name
    expect(operation.pushValue).to.equal('0x80'); // push argument
    expect(operation.length).to.equal(2); // 2 bytes
  });

  it('Opcode 002 should be PUSH1 40', async () => {
    const bytecode = await getBytecode('BasicToken');
    const operation = bytecode[1];
    expect(operation.offset).to.equal(2); // line number
    expect(operation.opcode.mnemonic).to.equal('PUSH1'); // mnemonic name
    expect(operation.pushValue).to.equal('0x40'); // push argument
    expect(operation.length).to.equal(2); // 2 bytes
  });

  it('Opcode 004 should be MSTORE', async () => {
    const bytecode = await getBytecode('BasicToken');
    const operation = bytecode[2];
    expect(operation.offset).to.equal(4); // line number
    expect(operation.length).to.equal(1); // 1 byte
    expect(operation.opcode.mnemonic).to.equal('MSTORE'); // mnemonic name
  });

  it('Should generate a string with all opcodes', async () => {
    const bytecode = await getBytecode('BasicToken');
    const opcodes: string = getOpcodes(bytecode);
    const instructions = opcodes.split(', ');
    expect(instructions[0]).to.equal('PUSH1 0x80');
    expect(instructions[1]).to.equal('PUSH1 0x40');
    expect(instructions[2]).to.equal('MSTORE');
  });
});
