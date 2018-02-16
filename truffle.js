module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8446,
      network_id: "1337" // Match any network id
    },
    ropsten: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x0038b5601A1B10e05C262046627798994709453a", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gasprice: 1000000000,
      gas: 4612388 // Gas limit used for deploys
    }
  
  }
};
