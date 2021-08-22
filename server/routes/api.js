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
        type: Sequelize.ARRAY(Sequelize.TEXT),
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
        type: Sequelize.ARRAY(Sequelize.INTEGER),
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
        for(let i = 0; i < geoData.length; i ++){
            choices.push(0);
        }
        
        return Rooms.bulkCreate([
            {
                // Room Fields
                room_code : room_code,
                expected_users : expected_users,
                responded_users : [],
                expire : Date.now() + 24 * 60 * 60 * 1000,
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

// Gets a specific room from the database 
async function getRoom(room_code) {
    const retrieveStatement = "SELECT * FROM rooms WHERE room_code = '" + room_code + "'";
    return (await sequelize.query(retrieveStatement))[0][0];
}

// Changes a room in the database to no longer accept responses
async function closeRoom(data) {
    const closeRoomStatement = "UPDATE rooms SET accepting_responses=false WHERE room_code = '" + room_code + "'";
    await sequelize.query(closeRoomStatement);

    // Send email to host
    email.sendReminderEmail(data.email, data.room_code);
}

router.get('/join_room', async function(req, res) {
    let room_code = req.query.room_code;
    let data = await getRoom(room_code);
    
    // If form is open
    if (data.accepting_responses) {
        
        // Close room and direct to results if 24 hours have elapsed
        if (Date.now > data.expire) {
            await closeRoom(data);
            res.send(null);
        }
        else {
            res.send(data.options);
        }
    } 
    else {
        // Redirect to results page
        res.send(null);
    }

});

router.post('/submit_choices', async function(req, res) {
    let respondent_name = req.body.respondent_name;
    let room_code = req.body.room_code;
    let data = await getRoom(room_code);
    
    // Submit votes
    let votes = req.body.votes;
    for (let i = 0; i < votes.length; i++) {
        if (votes[i]) data.choices[i]++;
    }

    // Add respondent to the list of all respondents
    const addRespondentName = "UPDATE rooms SET responded_users = ARRAY_APPEND(responded_users, '" + respondent_name + "') WHERE room_code = '" + room_code + "'";
    await sequelize.query(addRespondentName);

    // Close room if 24 hours have elapsed or if everybody has responded
    if (Date.now > data.expire || data.responded_users.length >= data.expected_users) {
        await closeRoom(data);
    }

    // Redirect user to results page
    res.send({"room_code" : room_code});

});

router.delete('/delete_room', async function(req, res) {
    let room_code = req.body.room_code;
    const deleteStatement = "DELETE FROM rooms WHERE room_code = '" + room_code + "'";
    await sequelize.query(deleteStatement);
    res.send("Room " + room_code + " was deleted successfully.");
});

router.get('/list', (req, res) => {
 
    // Get data from CockroachDB
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
    res.send("Email sent!");
})

module.exports = router;