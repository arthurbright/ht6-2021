const express = require('express');

const router = express.Router();


// Database Shenanigans
const parse = require("pg-connection-string").parse;
const { Pool } = require("pg");
const prompt = require("prompt");
const { execSync } = require("child_process");
const { v4: uuidv4 } = require("uuid");



// [TESTING] This function is called within the first transaction. It inserts some initial values into the "accounts" table.
async function initTable(client, callback) {
    let i = 0;
    while (i < accountValues.length) {
        accountValues[i] = await uuidv4();
        i++;
    }
  
    const insertStatement =
        "INSERT INTO accounts (id, balance) VALUES ($1, 1000), ($2, 250), ($3, 0);";
    await client.query(insertStatement, accountValues, callback);
  
    const selectBalanceStatement = "SELECT id, balance FROM accounts;";
    await client.query(selectBalanceStatement, callback);
}




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

module.exports = router;