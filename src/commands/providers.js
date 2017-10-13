const providers = require("../providers");

const handler = (msg, reply) => {
  const allProviders = [];
  for (const exchange in providers) {
    if (!providers.hasOwnProperty(exchange)) {
      continue;
    }
    allProviders.push(exchange);
  }

  reply.html(`<b>Supported providers</b>\n${allProviders.join("\n")}`);
};

module.exports = handler;
