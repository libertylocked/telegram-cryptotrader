const fetch = require("isomorphic-fetch");

module.exports = (base, quote) => {
  const requestURL = `https://api.hitbtc.com/api/1/public/${base}${quote}/ticker`;
  return fetch(requestURL)
    .then((resp) => {
      if (resp.status != 200) throw new Error(resp.status);
      return resp.json();
    })
    .then((data) => {
      return Promise.resolve(parseFloat(data.last));
    });
};
