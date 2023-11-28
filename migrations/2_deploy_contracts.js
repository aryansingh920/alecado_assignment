const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage, { gas: 6000000, gasPrice: 20000000000 });
};
