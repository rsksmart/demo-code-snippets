const multicallConfig = {
  // RSK Testnet
  31: {
    // maximum number of calls to batch into a single JSON-RPC call
    batchSize: 50,
    // defines the time each call is held on buffer waiting for subsequent calls before aggregation, ms
    timeWindow: 50,
    /* 
    0xsequience MultiCall
    https://github.com/0xsequence/wallet-contracts/blob/master/src/contracts/modules/utils/MultiCallUtils.sol
    deployed at RSK Testnet
    https://explorer.testnet.rsk.co/address/0xb39d1dea1bf91aef02484f677925904b9d6936b4?__ctab=Code
    */
    contract: '0xb39d1Dea1bF91Aef02484F677925904b9d6936B4',
  },
};

module.exports = multicallConfig;
