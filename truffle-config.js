module.exports = {
  networks: {
    development: {
      host: "192.168.110.1", // Update to your Ganache host
      port: 7545,
      network_id: "5777",
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.0",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
