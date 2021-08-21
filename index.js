//imports
const express = require("express");
const fs = require("fs");
const path = require("path");
const apiRoute = require("./server/routes/api");
const mongoose = require("mongoose");

//instantiate app
const app = express();
app.use(express.json());
app.use("/api", apiRoute);
//for development:
app.use("/static", express.static(__dirname + "client/public"));
//for deployment:
// app.use("/static", express.static(path.resolve(__dirname, "../client/build")));

//serve html
//for development
// res.sendFile(path.resolve(__dirname, "../client/public/index.html"));
//for deployment
// res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/public/index.html", "utf-8");
});

//run app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
