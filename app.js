const express = require("express");
const connectdb = require("./util/mongoConnect");
const app = express();
require("dotenv").config();

app.use(express.json());
connectdb();
app.get("/", (req, res) => {
  res.send("Welcome to the CoinList API");
});
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
});
