const fetch = require("isomorphic-fetch");

module.exports = (base, quote) => {
  const requestURL = `https://api.bitfinex.com/v1/pubticker/${base}${quote}`;
  return fetch(requestURL)
    .then((resp) => {
      if (resp.status != 200) throw new Error(resp.status);
      return resp.json();
    })
    .then((data) => {
      return Promise.resolve(parseFloat(data.last_price));
    });
};
