// XXX: some hacks require clean up
const web3 = require("../web3-client");
const subcommands = require("./eth-subcommands");

const handler = (msg, reply) => {
  const [subcommand, ...args] = msg.args(2);
  if (!subcommand) {
    reply.text("Subcommand required.\nAvailable subcommands are:\n\n" +
      Object.keys(subcommands).join("\n"));
    return;
  }

  if (subcommands.hasOwnProperty(subcommand)) {
    subcommands[subcommand](reply, web3, args);
  } else {
    reply.text("Unknown subcommand: " + subcommand);
  }
};

module.exports = handler;
