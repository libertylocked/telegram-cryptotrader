module.exports = (reply, web3, args) => {
  if (args.length < 1) {
    reply.text("Address argument required");
    return;
  }
  if (!web3.isAddress(args[0])) {
    reply.text("Not an address");
    return;
  }
  web3.eth.getBalanceAsync(args[0])
    .then((bal) => {
      reply.text(`${args[0]}\nBalance: ${web3.fromWei(bal).toString()} ETH`);
    })
    .catch((err) => {
      reply.text("Error getting balance of account");
    });
};
