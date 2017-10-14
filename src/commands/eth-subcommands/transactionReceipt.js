module.exports = (reply, web3, args) => {
  if (args.length < 1 || web3.isAddress(args[0])) {
    reply.text("Transaction hash is required");
    return;
  }
  web3.eth.getTransactionReceiptAsync(args[0]).then((txReceipt) => {
    if (!txReceipt) {
      reply.text("Tx not found");
      return;
    }
    reply.html(`<pre>${JSON.stringify(txReceipt, null, 2)}</pre>`);
  }).catch((err) => {
    reply.text("Error getting tx: " + args[0]);
  });
};
