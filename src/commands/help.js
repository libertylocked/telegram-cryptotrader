const HELP_TEXT = "<b>Cryptocurrency Info Bot - by libertylocked</b>\n" +
  "<b>price</b> - see last trade prices on multiple exchanges. Usage: /price [BASE] [QUOTE]\n" +
  "<b>providers</b> - the list of supported exchanges\n" +
  "<b>eth</b> - ethereum web3 functions (advanced users only). Node kindly provided by INFURA\n" +
  "<b>help</b> - see list of commands\n" +
  "\n<b>GitHub</b>: <a>https://github.com/libertylocked/telegram-cryptotrader</a>";

const handler = (msg, reply) => {
  reply.html(HELP_TEXT);
};

module.exports = handler;
