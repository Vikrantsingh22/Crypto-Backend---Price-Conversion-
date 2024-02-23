const express = require("express");
const {
  getValueofCurrency,
  getCurrentCurrencyHoldings,
} = require("../controller/coinList");
const coinList = require("../models/coinList");
const { logger } = require("../util/winston");
const router = express.Router();

router.get("/convert", getValueofCurrency);
router.get("/companyHoldings", getCurrentCurrencyHoldings);
// Extra code snippet can be ignored
router.get("/listCoins", async (req, res, next) => {
  try {
    const response = await coinList.find();
    res.json({
      msg: "List of all the document stored in MONGODB database",
      data: response,
    });
  } catch (err) {
    logger.error("error while fetching the list of coin from database", err);

    next(err);
  }
});

module.exports = { router };
