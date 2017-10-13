// XXX: Cryptocompare isn't really an exchange. Should we include this?

const fetch = require("isomorphic-fetch");

module.exports = (base, quote) => {
  const requestURL = `https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${quote}`;
  return fetch(requestURL)
    .then((resp) => {
      if (resp.status != 200) throw new Error(resp.status);
      return resp.json();
    })
    .then((data) => {
      return Promise.resolve(parseFloat(data[quote]));
    });
};
