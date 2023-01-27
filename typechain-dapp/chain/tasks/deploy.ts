import { task } from 'hardhat/config';
import fs from 'fs-extra';
import path from 'path';
import type { HardhatRuntimeEnvironment } from 'hardhat/types';

const frontContractDir = path.resolve('..', 'front', 'src', 'contracts');
const typechainDirName = 'typechain-types';

async function saveFrontendFiles(
  contractName: string,
  address: string,
  hre: HardhatRuntimeEnvironment,
) {
  if (hre.network.name === 'hardhat') return;
  // write contract address to the frontend
  await fs.outputJSON(
    path.resolve(
      frontContractDir,
      `${contractName}.${hre.network.name}.address.json`,
    ),
    { address },
  );
  // copy typechain folder to the frontend
  await fs.copy(
    path.resolve(typechainDirName),
    path.resolve(frontContractDir, typechainDirName),
  );
  console.log(
    `Artifacts were copied to the frontend folder ${frontContractDir}`,
  );
}

// Command line parameters of the new task
interface DeployParams {
  token: string;
  supply: string;
}
export default task('deploy', 'Deploys smart contracts')
  .addOptionalParam('token', 'Set token to deploy', 'MeowToken')
  .addOptionalParam('supply', 'Set initial supply', '10000')
  .setAction(async ({ supply, token }: DeployParams, hre) => {
    try {
      const initialSupply = parseInt(supply);
      if (isNaN(initialSupply)) throw new Error(`Wrong supply value ${supply}`);
      if (hre.network.name === 'hardhat')
        throw new Error(`Use 'localhost' network for local deployment`);
      await hre.run('compile');
      const ContractFactory = await hre.ethers.getContractFactory(token);
      const contract = await ContractFactory.deploy(initialSupply);
      await contract.deployed();
      console.log(
        `${token} was deployed to ${hre.network.name} with initial supply ${initialSupply} and address ${contract.address}`,
      );
      await saveFrontendFiles(token, contract.address, hre);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
      else console.log(error);
    }
  });
