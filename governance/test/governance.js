const { expect } = require('chai');
const { ethers } = require('hardhat');
const rifAbi = require('./rif-abi.json');

const rifTestnetAddress = '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE';

describe('Governance', () => {
  let deployer;
  let proposer;
  let voter1;
  let voter2;
  let rif;
  let rifVote;
  let timelockController;
  let governor;

  const rifTotalSupply = 10; // should be even
  const minDelay = 0;

  before(async () => {
    [deployer, proposer, voter1, voter2] = await ethers.getSigners();
    // getting test RIF token smart contract
    if (hre.network.name === 'rsktestnet') {
      rif = await ethers.getContractAt(rifAbi, rifTestnetAddress, deployer);
    } else {
      const RIF = await ethers.getContractFactory('RIFToken');
      rif = await RIF.deploy(rifTotalSupply).then((tx) => tx.deployed());
    }
    // using vote token as a wrapper around the existing RIF token
    const RIFVote = await ethers.getContractFactory('RIFVoteToken');
    rifVote = await RIFVote.deploy(rif.address).then((tx) => tx.deployed());

    // deploying Time Lock Controller
    const TimeLockController = await ethers.getContractFactory(
      'MyTimelockController',
    );
    timelockController = await TimeLockController.deploy(
      minDelay,
      [ethers.constants.AddressZero],
      [ethers.constants.AddressZero],
    ).then((tx) => tx.deployed());
    // deploying Governor
    const Governor = await ethers.getContractFactory('MyGovernor');
    governor = await Governor.deploy(
      rifVote.address,
      timelockController.address,
    ).then((tx) => tx.deployed());
  });

  describe('ERC20Wrapper', () => {
    it('Should wrap all RIF tokens in RIFVote tokens', async () => {
      await rif
        .approve(rifVote.address, rifTotalSupply)
        .then((tx) => tx.wait());
      await rifVote
        .depositFor(deployer.address, rifTotalSupply)
        .then((tx) => tx.wait());
      const rifVoteTotalSupply = await rifVote.totalSupply();
      expect(rifVoteTotalSupply).to.equal(rifTotalSupply);
    });

    it('Should transfer RIFVote tokens from deployer to voters', async () => {
      await rifVote
        .transfer(voter1.address, rifTotalSupply / 2)
        .then((tx) => tx.wait());
      await rifVote
        .transfer(voter2.address, rifTotalSupply / 2)
        .then((tx) => tx.wait());
      expect(await rifVote.balanceOf(voter1.address)).to.equal(
        rifTotalSupply / 2,
      );
      expect(await rifVote.balanceOf(voter2.address)).to.equal(
        rifTotalSupply / 2,
      );
    });
  });

  describe('Proposal', () => {
    let transferCalldata;
    let proposalId;
    const proposalDescription = 'Proposal #1: Give grant to team';

    it('Proposer should be able to create a proposal', async () => {
      const grantAmount = 100;
      transferCalldata = rifVote.interface.encodeFunctionData('transfer', [
        proposer.address,
        grantAmount,
      ]);
      const proposeSignature = 'propose(address[],uint256[],bytes[],string)';
      const tx = await governor
        .connect(proposer)
        [proposeSignature](
          [rifVote.address],
          [0],
          [transferCalldata],
          proposalDescription,
        );
      const receipt = await tx.wait();
      const { args } = receipt.events.find(
        (e) => e.event === 'ProposalCreated',
      );
      proposalId = args.proposalId;
      expect(args.proposer).to.equal(proposer.address);
      expect(args.description).to.equal(proposalDescription);
    });

    it('Token holders should not initially be delegated', async () => {
      expect(await rifVote.delegates(voter1.address)).to.equal(
        ethers.constants.AddressZero,
      );
      expect(await rifVote.delegates(voter2.address)).to.equal(
        ethers.constants.AddressZero,
      );
      expect(await rifVote.delegates(deployer.address)).to.equal(
        ethers.constants.AddressZero,
      );
    });

    it('Token holders should self-delegate the voting power', async () => {
      await expect(rifVote.connect(voter1).delegate(voter1.address))
        .to.emit(rifVote, 'DelegateChanged')
        .withArgs(voter1.address, ethers.constants.AddressZero, voter1.address);

      await expect(rifVote.connect(voter2).delegate(voter2.address))
        .to.emit(rifVote, 'DelegateChanged')
        .withArgs(voter2.address, ethers.constants.AddressZero, voter2.address);
    });

    it('Token holders should be delegated', async () => {
      expect(await rifVote.delegates(voter1.address)).to.equal(voter1.address);
      expect(await rifVote.delegates(voter2.address)).to.equal(voter2.address);
    });

    it('Voter 1 should vote', async () => {
      const reason = 'because I am right';
      const support = 0;
      const tx = governor
        .connect(voter1)
        .castVoteWithReason(proposalId, support, reason);
      await expect(tx)
        .to.emit(governor, 'VoteCast')
        .withArgs(voter1.address, proposalId, support, 0, reason);
    });

    it('Voter 2 should vote', async () => {
      const reason = 'because I am also right';
      const support = 0;
      const tx = governor
        .connect(voter2)
        .castVoteWithReason(proposalId, support, reason);
      await expect(tx)
        .to.emit(governor, 'VoteCast')
        .withArgs(voter2.address, proposalId, support, 0, reason);
    });

    it('quorum', async () => {
      const blockNumber = await ethers.provider.getBlockNumber();
      const quorum = await governor.quorum(blockNumber - 1);
      console.log(quorum);
    });

    /*  it('Propose', async () => {
      const descriptionHash = ethers.utils.id(proposalDescription);
      const queueSignature = 'queue(address[],uint256[],bytes[],bytes32)';
      const tx = await governor[queueSignature](
        [rifVote.address],
        [0],
        [transferCalldata],
        descriptionHash,
      );
    }); */
  });
});
