const mongoose = require("mongoose");
const { logger } = require("./winston");

const connectdb = async (req, res, next) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "coinList",
    });
    console.log("database connected");
  } catch (err) {
    const error = {
      statusCode: 500,
      message: "Error while connecting the database",
    };
    logger.error(err);
    next(error);
  }
};

module.exports = connectdb;
