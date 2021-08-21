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

//debug paths
app.get("/geo", async (req, res)=>{
  let data = await geo.getDestinations(43.858730, -79.286930, 3000, "restaurant");
  
  res.json(data);
});

app.get("/rev", async (req, res)=>{
  let data = await geo.getReviews(43.8544773302915,-79.2540960197085, "Boston Pizza");
  
  res.json(data);
});

//serve html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});



//run app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
