const express = require("express");
const app = express();
const path = require("path");

app.listen(4000, () => {
  console.log("Running at Port 4000...");
});

app.use(express.static(path.join(__dirname, "./")));

app.use((_, res) => {
  res.sendStatus(404);
});
