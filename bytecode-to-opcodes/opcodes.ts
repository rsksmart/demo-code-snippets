import { ethers } from 'hardhat';
import { disassemble, Bytecode } from '@ethersproject/asm';

export async function getBytecode(contract: string): Promise<Bytecode> {
  const Factory = await ethers.getContractFactory(contract);
  return disassemble(Factory.bytecode);
}

export function getOpcodes(bytecode: Bytecode): string {
  return bytecode
    .map(
      ({ opcode, pushValue }) =>
        opcode.mnemonic + (pushValue ? ` ${pushValue}` : ''),
    )
    .join(', ');
}
