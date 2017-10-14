const Web3 = require("web3");
const Bluebird = require("bluebird");

// global web3 client
const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/ethwatch-crx"));
Bluebird.promisifyAll(web3.eth, {
  suffix: "Async",
});

module.exports = web3;
