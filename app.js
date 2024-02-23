const express = require("express");
const app = express();

app.use(express.json());

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
});
