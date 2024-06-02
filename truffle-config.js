module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Update to your Ganache host
      port: 8545,
      network_id: "*",
      gas: 6721975,
      gasPrice: 20000000000,
    },
  },

  mocha: {
  },

  compilers: {
    solc: {
      version: "0.8.20",      // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
