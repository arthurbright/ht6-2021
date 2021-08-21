//imports
const express = require("express");
const fs = require("fs");
const path = require("path");
const apiRoute = require("./routes/api");
const geo = require('./util/geo.js');

//instantiate app
const app = express();
app.use(express.json());
app.use("/api", apiRoute);

//for development:
app.use(express.static(path.resolve(__dirname, "../client/build")));

//serve html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  // res.sendFile(__dirname + "/client/public/index.html", "utf-8");
});

//run app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
