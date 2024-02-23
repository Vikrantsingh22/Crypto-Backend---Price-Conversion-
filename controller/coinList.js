const coinList = require("../models/coinList");
const axios = require("axios");

// populating the data in the coinList collection from the API

const updateCoinList = async () => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
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
    console.log(err);
  }
  console.log("Data populated successfully");
};

module.exports = updateCoinList;
