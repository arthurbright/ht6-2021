// Imports
const express = require("express");
const fs = require("fs");
const path = require("path");
const apiRoute = require("./routes/api");
const geo = require('./util/geo.js');

// Instantiate App
const app = express();
app.use(express.json());
app.use("/api", apiRoute);

// For Development:
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Debug Paths
app.get("/geo", async (req, res)=>{
    let data = await geo.getDestinations(43.858730, -79.286930, 3000, "park");
  
    res.json(data);
});

app.get("/rev", async (req, res)=>{
    let data = await geo.getReviews(43.8544773302915,-79.2540960197085, "Boston Pizza");
  
    res.json(data);
});

// Serve HTML
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Run app
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});




