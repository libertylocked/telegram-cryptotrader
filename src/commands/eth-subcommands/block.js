module.exports = (reply, web3, args) => {
  if (args.length < 1) {
    reply.text("Block hash or number is required");
    return;
  }
  web3.eth.getBlockAsync(args[0])
    .then((block) => {
      reply.html(`<pre>${JSON.stringify(block, null, 2)}</pre>`);
    })
    .catch((err) => {
      reply.text("Error getting block: " + args[0]);
    });
};
