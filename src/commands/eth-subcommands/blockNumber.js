module.exports = (reply, web3, args) => {
  web3.eth.getBlockNumberAsync()
    .then((bNumber) => {
      reply.text(bNumber);
    })
    .catch((err) => {
      reply.text("Error getting block number");
    });
};
