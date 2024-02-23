// List of the required API's for the application

const apiList = `https://api.coingecko.com/api/v3/coins/list`;
const convertCoin = (fromCurrency, date) =>
  `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}&localization=false`;

const companyHoldings = (currency) =>
  `https://api.coingecko.com/api/v3/companies/public_treasury/${currency}`;

module.exports = { apiList, convertCoin, companyHoldings };
