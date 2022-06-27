/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { ethers } = require('hardhat');
const rifAbi = require('./rif-abi.json');

const rifTestnetAddress = '0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE';

describe('Governance', () => {
  let deployer;
  let proposer;
  let voter1;
  let voter2;
  let voter3;
  let voter4;
  let rif;
  let rifVote;
  let timelockController;
  let governor;

  const rifTotalSupply = 100;

  before(async () => {
    [deployer, proposer, voter1, voter2, voter3, voter4] =
      await ethers.getSigners();
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
    const minDelay = 0;
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
      await rifVote.transfer(voter1.address, 20).then((tx) => tx.wait());
      await rifVote.transfer(voter2.address, 30).then((tx) => tx.wait());
      await rifVote.transfer(voter3.address, 50).then((tx) => tx.wait());
      expect(await rifVote.balanceOf(voter1.address)).to.equal(20);
    });
  });

  describe('Proposal', () => {
    let transferCalldata;
    let proposalId;
    const proposalDescription = 'Proposal #1: Give grant to team';
    const support = 0;

    it('Proposer should be able to create a proposal', async () => {
      transferCalldata = rifVote.interface.encodeFunctionData('transfer', [
        proposer.address,
        rifTotalSupply,
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

    it('Initial vote balances should be zero', async () => {
      const voteBalance1 = await rifVote.getVotes(voter1.address);
      const voteBalance2 = await rifVote.getVotes(voter2.address);
      const voteBalance3 = await rifVote.getVotes(voter3.address);
      const voteBalanceProposer = await rifVote.getVotes(proposer.address);
      expect(voteBalance1).to.equal(0);
      expect(voteBalance2).to.equal(0);
      expect(voteBalance3).to.equal(0);
      expect(voteBalanceProposer).to.equal(0);
    });

    it('Token holders should not initially be delegated', async () => {
      expect(await rifVote.delegates(voter1.address)).to.equal(
        ethers.constants.AddressZero,
      );
      expect(await rifVote.delegates(voter2.address)).to.equal(
        ethers.constants.AddressZero,
      );
      expect(await rifVote.delegates(voter3.address)).to.equal(
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

      await expect(rifVote.connect(voter3).delegate(voter3.address))
        .to.emit(rifVote, 'DelegateChanged')
        .withArgs(voter3.address, ethers.constants.AddressZero, voter3.address);
    });

    it('Proposer with zero (0) tokens also can delegate himself', async () => {
      await expect(rifVote.connect(proposer).delegate(proposer.address))
        .to.emit(rifVote, 'DelegateChanged')
        .withArgs(
          proposer.address,
          ethers.constants.AddressZero,
          proposer.address,
        );
    });

    it('Token holders should be delegated', async () => {
      expect(await rifVote.delegates(voter1.address)).to.equal(voter1.address);
      expect(await rifVote.delegates(voter2.address)).to.equal(voter2.address);
    });

    it('Should set the vote balances after the delegation', async () => {
      expect(await rifVote.getVotes(voter1.address)).to.equal(20);
      expect(await rifVote.getVotes(voter2.address)).to.equal(30);
      expect(await rifVote.getVotes(voter3.address)).to.equal(50);
    });

    it('Proposer vote balance should remain 0', async () => {
      const proposerBalance = await rifVote.getVotes(proposer.address);
      expect(proposerBalance).to.equal(0);
    });

    it('Voter 1 should vote', async () => {
      expect(await governor.hasVoted(proposalId, voter1.address)).to.be.false;

      const reason = 'because I am right';
      const tx = governor
        .connect(voter1)
        .castVoteWithReason(proposalId, support, reason);
      await expect(tx)
        .to.emit(governor, 'VoteCast')
        .withArgs(voter1.address, proposalId, support, 0, reason);

      expect(await governor.hasVoted(proposalId, voter1.address)).to.be.true;
    });

    it('Voter 2 should vote', async () => {
      const reason = 'because I am also right';
      const tx = governor
        .connect(voter2)
        .castVoteWithReason(proposalId, support, reason);
      await expect(tx)
        .to.emit(governor, 'VoteCast')
        .withArgs(voter2.address, proposalId, support, 0, reason);
    });

    it('Voter 3 should vote', async () => {
      const reason = 'because I am also right';
      const tx = governor
        .connect(voter3)
        .castVoteWithReason(proposalId, support, reason);
      await expect(tx)
        .to.emit(governor, 'VoteCast')
        .withArgs(voter3.address, proposalId, support, 0, reason);
    });

    it('Everybody can vote (why?)', async () => {
      const reason = 'can I?';
      const tx = governor
        .connect(voter4)
        .castVoteWithReason(proposalId, support, reason);
      await expect(tx)
        .to.emit(governor, 'VoteCast')
        .withArgs(voter4.address, proposalId, support, 0, reason);
    });

    it('should reach the deadline', async () => {
      const deadline = await governor.proposalDeadline(proposalId);
      const { number } = await ethers.provider.getBlock();
      expect(deadline).lte(number);
    });

    it('quorum reached. vote succeeded', async () => {
      const { number } = await ethers.provider.getBlock();
      console.log(await governor.quorum(number - 1));
      const quorumReached = await governor.quorumReached(proposalId);
      const voteSucceeded = await governor.voteSucceeded(proposalId);
      console.log(quorumReached, voteSucceeded);
    });

    /* it('should queue the finished proposal', async () => {
      const descriptionHash = ethers.utils.id(proposalDescription);
      const queueSignature = 'queue(address[],uint256[],bytes[],bytes32)';
      await governor[queueSignature](
        [rifVote.address],
        [0],
        [transferCalldata],
        descriptionHash,
      );
    }); */
  });
});
