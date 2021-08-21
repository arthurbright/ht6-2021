require('dotenv').config();

const express = require('express');
const router = express.Router();

const fs = require("fs");

// Database Shenanigans
const parse = require("pg-connection-string").parse;
const { Pool } = require("pg");
const prompt = require("prompt");
const { execSync } = require("child_process");
const { v4: uuidv4 } = require("uuid");

// Connecting to CockroachDB through Sequelize
const Sequelize = require("sequelize-cockroachdb");
const { prependOnceListener } = require("process");
var sequelize = new Sequelize({
    dialect: "postgres",
    username: "test_app",
    password: process.env.COCKROACHDBPWD,
    host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
    port: 26257,
    database: "kindling-3054.defaultdb",
    dialectOptions: {
        ssl: {
      
      //For secure connection:
        /*ca: fs.readFileSync('YOURPATH/cc-ca.crt')
            .toString()*/
        },
    },
    logging: false, 
});



const Rooms = sequelize.define("rooms", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
    },
});

const People = sequelize.define("people", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    },
    name: {
        type: Sequelize.TEXT,
    },
    phoneNumber: {
        type: Sequelize.INTEGER,
    },
});


// Testing

router.get('/hi', (req, res)=>{
    res.json({
        lavan: 420
    })
});

router.get('/kevin_test', (req, res)=>{
    res.json({
        pi: 3.14
    })
});


// Add entry to Sequelize DB
/*
router.post('/submit', function(req, res) {
    
    Rooms.sync({force:false})
        .then(function () {
        
            return Rooms.bulkCreate([


            ]);
        })

        .catch(function (err) {
            console.error("error: " + err.message);
        });

        res.send('Submitted Successfully!<br /> [confirmation]');


});*/
//Handle submitted form data
 
router.post('/submit', function (req, res) {
 
    //Get our values submitted from the form
    var fromName = req.body.name;
    var fromPhone = req.body.phone;
 
    //Add our POST data to CockroachDB via Sequelize
    People.sync({
        force: false,
    })
        .then(function () {
        // Insert new data into People table
        return People.bulkCreate([
            {
            name: fromName,
            phoneNumber: fromPhone,
            },
        ]);
        })
 
    	  //Error handling for database errors
        .catch(function (err) {
        console.error("error: " + err.message);
        });    
        
        //Tell them it was a success
        res.send('Submitted Successfully!<br /> Name:  ' + fromName + '<br />Phone:  ' + fromPhone);
});

router.get('/list', (req, res) => {
 
    //Get our data from CockroachDB
    People.sync({
         force:false,
    })
    .then(function() {
       return People.findAll();
    })
        
    .then(function (people) {
        //Render output from CockroachDB using our PUG template
        //res.render('list', { people : people });

        /*people.forEach(function (person) {
            res.json(person);
        });*/
        res.json(people);
        
    })
 
})


module.exports = router;