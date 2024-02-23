const express = require("express");
const connectdb = require("./util/mongoConnect");
const { router } = require("./route/route");
const cron = require("node-cron");
const { updateCoinList } = require("./controller/coinList");
const coinList = require("./models/coinList");
const app = express();
const cors = require("cors");
const errorMiddleware = require("./middleware/errorHandler");
// do not keep the origin as * in production
// as the authentication cookies will not be sent as the origin is * that is wildcard
// origin should be the domain of the frontend
// Added this to allow the cross origin request from frontend
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
    optionsSuccessStatus: 200,
    maxAge: 86400,
  })
);

// if we dont want to use the cors then we can also use the proxy in the package.json file in the frontend
require("dotenv").config();

app.use(express.json());
connectdb();
app.get("/", (req, res) => {
  res.send("Welcome to the CoinList API");
});
app.use("/api", router);

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
});
// TASK 1
// using the cron scheduler to update the database every hour
cron.schedule("0 * * * *", () => {
  updateCoinList();
});
app.use(errorMiddleware);
