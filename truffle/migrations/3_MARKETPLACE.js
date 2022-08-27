const MARKETPLACE = artifacts.require("MARKETPLACE");

module.exports = function (deployer) {
  deployer.deploy(MARKETPLACE);
};
