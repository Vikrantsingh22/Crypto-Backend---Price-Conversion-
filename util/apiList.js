// List of the required API's for the application

require("dotenv").config();
const coinListAPI = `https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${process.env.APIKEY}`;
const convertCoin = (fromCurrency, date) =>
  `https://api.coingecko.com/api/v3/coins/${fromCurrency}/history?date=${date}&localization=false&x_cg_demo_api_key=${process.env.APIKEY}`;

const companyHoldings = (currency) =>
  `https://api.coingecko.com/api/v3/companies/public_treasury/${currency}?x_cg_demo_api_key=${process.env.APIKEY}`;

module.exports = { coinListAPI, convertCoin, companyHoldings };
