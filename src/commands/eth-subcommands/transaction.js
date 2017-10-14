module.exports = (reply, web3, args) => {
  if (args.length < 1 || web3.isAddress(args[0])) {
    reply.text("Transaction hash is required");
    return;
  }
  web3.eth.getTransactionAsync(args[0]).then((tx) => {
    if (!tx) {
      reply.text("Tx not found");
      return;
    }
    reply.html(`<pre>${JSON.stringify(tx, null, 2)}</pre>`);
  }).catch((err) => {
    reply.text("Error getting tx: " + args[0]);
  });
};
