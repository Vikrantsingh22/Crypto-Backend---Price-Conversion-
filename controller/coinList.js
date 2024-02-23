const coinList = require("../models/coinList");
const axios = require("axios");
const {
  coinListAPI,
  convertCoin,
  companyHoldings,
} = require("../util/apiList");
var moment = require("moment");
const { logger } = require("../util/winston");

// populating the data in the coinList collection from the API

// TASK 1
const updateCoinList = async (req, res, next) => {
  try {
    const response = await axios.get(coinListAPI);
    const list = response.data;
    // using the map instead of the for loop to iterate beacuse for loop will execute the coinList.save() several times
    // using the insertMany method to insert the data in the collection
    // Firsty delete the existing documents and then insert the new dopucments
    const coinListData = list.map((coinIndex) => ({
      id: coinIndex.id,
      name: coinIndex.name,
    }));
    await coinList.deleteMany({});
    await coinList.insertMany(coinListData);
  } catch (err) {
    const error = {
      statusCode: 500,
      message: "Error in populating the data",
    };
    logger.error("error while populating the data in database from api", err);
    next(error);
  }
  console.log("Data populated successfully");
};

// TASK 2

const getValueofCurrency = async (req, res, next) => {
  try {
    const { fromCurrency, toCurrency, date } = req.body;
    // I made use of moment package to format the given date easily
    // if the provide date is in form of DD:MM:YYYY or DD/MM/YYYY it will format it to DD-MM-YYYY
    // only DD-MM-YYYY is supported by coinGecko
    // Converting Coin 1 to BTC
    const formattedDate = moment(date, "DD-MM-YYYY").format("DD-MM-YYYY");
    const fromCurrencyResponse = await axios.get(
      convertCoin(fromCurrency, formattedDate)
    );
    const coin1InTermsOfBTC =
      fromCurrencyResponse.data.market_data.current_price.btc;

    // Converting Coin 2 to BTC
    const toCurrencyResponse = await axios.get(
      convertCoin(toCurrency, formattedDate)
    );
    const coin2InTermsOfBTC =
      toCurrencyResponse.data.market_data.current_price.btc;

    const Coin1InTermsOfCoin2 =
      Number(coin1InTermsOfBTC) / Number(coin2InTermsOfBTC);
    // console.log(Coin1InTermsOfCoin2);
    const message = `1 ${fromCurrency} = ${Coin1InTermsOfCoin2} ${toCurrency}`;
    res.json({
      msg: message,
      onDate: formattedDate,
    });
  } catch (err) {
    const error = {
      statusCode: 400,
      message:
        "Please enter the correct id of the currency or the date is not correct",
    };
    logger.error("error while converting the currencies", err);
    next(error);
  }
};

// TASK 2

const getCurrentCurrencyHoldings = async (req, res, next) => {
  try {
    const { currency } = req.body;
    const response = await axios.get(companyHoldings(currency));
    // coinGecko supported values are only bitcoin or ethereum.
    const data = response.data.companies;

    // As we only need the list of company's name we will discard the rest data
    const ListCompanyName = data.map((companyIndex) => ({
      CompanyName: companyIndex.name,
    }));
    if (ListCompanyName.length > 0) {
      res.json({
        msg: "Returning only the name of company other data is been discarded intentionally",
        res: ListCompanyName,
      });
    } else {
      res.json({
        msg: "coinGecko supported values are only bitcoin or ethereum.",
      });
    }
  } catch (err) {
    const error = {
      statusCode: 400,
      message:
        "Please enter the correct id of the currency or the currency is not supported by coinGecko",
    };
    logger.error("error while fetching list of company", err.response.data);
    next(error);
  }
};
module.exports = {
  updateCoinList,
  getValueofCurrency,
  getCurrentCurrencyHoldings,
};
