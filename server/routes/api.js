require('dotenv').config();

const express = require('express');
const router = express.Router();

// Connecting to CockroachDB through Sequelize
const Sequelize = require("sequelize-cockroachdb");
var sequelize = new Sequelize({
    dialect: "postgres",
    username: "test_app",
    password: process.env.COCKROACHDBPWD,
    host: "free-tier.gcp-us-central1.cockroachlabs.cloud",
    port: 26257,
    database: "kindling-3054.defaultdb",
    dialectOptions: {
        ssl: {
            //For secure connection (remember to require fs):
            /*ca: fs.readFileSync('YOURPATH/cc-ca.crt').toString()*/
        },
    },
    logging: false, 
});

const geo = require("../util/geo.js");
const email = require("../util/email.js");

const Rooms = sequelize.define("rooms", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    room_code: {
        type: Sequelize.TEXT,
    },
    expected_users: {
        type: Sequelize.INTEGER,
    },
    responded_users: {
        type: Sequelize.JSON,
    },
    expire: {
        type: Sequelize.DATE,
    },
    accepting_responses: {
        type: Sequelize.BOOLEAN,
    },
    email: {
        type: Sequelize.TEXT,
    },
    location_parameters: {
        type: Sequelize.JSON,
    },
    options: {
        type: Sequelize.JSON,
    },
    choices: {
        type: Sequelize.JSON,
    },
});

const room_codes = new Set();

function generate_room_code() {
    room_codes.add("");
    let ret = "";
    let attempts = 0;
    while (room_codes.has(ret)) {
        let room_code_num = Math.floor(Math.random()*Math.pow(26, 4));
        ret = "";
        for (let i = 0; i < 4; i++) {
            ret = String.fromCharCode(65 + room_code_num % 26) + ret;
            room_code_num = Math.floor(room_code_num/26);
        }
        if (attempts++ > 100) {
            throw exception;
        }
    }
    room_codes.add(ret);
    return ret;
}

router.post('/create_room', function(req, res) {

    let room_code = generate_room_code();
    let expected_users = req.body.expected_users;
    let email = req.body.email;
    let location_parameters = req.body.location_parameters;

    Rooms.sync({force: false})
    .then(async function () {
        let choices = []
        let geoData = await geo.getList(location_parameters.latitude, location_parameters.longitude, location_parameters.radius, location_parameters.types, location_parameters.numResults);
        for(let i = 0; i < geoData.length(); i ++){
            choices.push(0);
        }
        
        return Rooms.bulkCreate([
            {
                // Room Fields
                room_code : room_code,
                expected_users : expected_users,
                responded_users : [],
                expire : Date.now(),
                accepting_responses : true,
                email : email,
                location_parameters : location_parameters,
                options : geoData,
                choices : choices
            }
        ]);
    })
    // Handle database errors
    .catch(function (err) {
        console.error("error: " + err.message);
    });  
    res.send({"room_code" : room_code});
});

router.get('/join_room', async function(req, res) {
    let room_code = req.query.room_code;

    // TODO: UPDATE BASED ON LAVANS NEEDS
    const retrieveStatement = "SELECT * FROM rooms WHERE room_code = '" + room_code + "'";
    let data = (await sequelize.query(retrieveStatement))[0];
    res.send(data);

    console.log(data);


});

router.post('/submit_choices', function(req, res) {
    // TODO

    

});

router.delete('/delete_room', async function(req, res) {
    let room_code = req.body.room_code;
    const deleteStatement = "DELETE FROM rooms WHERE room_code = '" + room_code + "'";
    await sequelize.query(deleteStatement);
    res.send("Room " + room_code + " was deleted successfully.");
});

router.get('/list', (req, res) => {
 
    //Get our data from CockroachDB
    Rooms.sync({force:false,})
    .then(function() {
       return Rooms.findAll();
    })
    .then(function (room) {  
        res.json(room);
    })
 
})

router.get('/email', (req, res) => {
    email.sendTestMail();
})

module.exports = router;