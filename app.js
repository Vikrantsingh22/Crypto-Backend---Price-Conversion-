const express = require("express");
const connectdb = require("./util/mongoConnect");
const updateCoinList = require("./controller/coinList");
const app = express();
require("dotenv").config();

app.use(express.json());
connectdb();
// updateCoinList();
app.get("/convert", updateCoinList.getValueofCurrency);
app.get("/", (req, res) => {
  res.send("Welcome to the CoinList API");
});
app.get("/companyHoldings", updateCoinList.getCurrentCurrencyHoldings);
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
});
