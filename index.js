//imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const apiRoute = require('./server/routes/api');
const mongoose = require('mongoose');

//instantiate app
const app = express();
app.use(express.json());
app.use("/api", apiRoute);
app.use('/static', express.static(__dirname + "client/public"));

//serve html
app.get("*", (req, res)=>{
    res.sendFile(__dirname + '/client/public/index.html', "utf-8");
})

//run app
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})