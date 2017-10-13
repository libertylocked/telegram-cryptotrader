// XXX: some hacks require clean up

const Web3 = require("web3");
const Bluebird = require("bluebird");

// global web3 client
const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("https://mainnet.infura.io/ethwatch-crx"));
Bluebird.promisifyAll(web3.eth, {
  suffix: "Async",
});

const handler = (msg, reply) => {
  const [subcommand, ...args] = msg.args(2);
  if (!subcommand) {
    reply.text("Subcommand required");
    return;
  }

  if (subcommand === "blockNumber") {
    require("./eth-subcommands/blockNumber")(reply, web3, args);
  } else if (subcommand === "balance") {
    require("./eth-subcommands/balance")(reply, web3, args);
  } else {
    reply.text("Unknown subcommand: " + subcommand);
  }
};

module.exports = handler;
