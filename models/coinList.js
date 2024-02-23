const mongoose = require("mongoose");

const coinListSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("coinList", coinListSchema);
