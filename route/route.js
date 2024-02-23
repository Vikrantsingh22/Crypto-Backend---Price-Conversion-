const express = require("express");
const {
  getValueofCurrency,
  getCurrentCurrencyHoldings,
} = require("../controller/coinList");
const coinList = require("../models/coinList");
const router = express.Router();

router.get("/convert", getValueofCurrency);
router.get("/companyHoldings", getCurrentCurrencyHoldings);
// Extra code snippet can be ignored
router.get("/listCoins", async (req, res) => {
  try {
    const response = await coinList.find();
    res.json({
      msg: "List of all the document stored in MONGODB database",
      data: response,
    });
  } catch (err) {
    console.log(err.code);
  }
});

module.exports = { router };
