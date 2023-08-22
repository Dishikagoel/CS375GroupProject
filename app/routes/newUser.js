const express = require('express');
const router = express.Router();
const path = require('path');
const env = require("../../env.json");
const { Pool } = require("pg");
const pool = new Pool(env);

// GET /example/hello
router.get("/add", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'newUser.html'));
    //res.sendFile(path.join(__dirname, '../public', 'newUserScript.js'));
    console.log("account creation page\n");
    //console.log("rand: ", rand())
});

router.get("/addUser", (req, res) => {
    console.log("account initialization page\n");

    let Ufirst = req.query.first;
    let Ulast = req.query.last;
    let Uemail = req.query.email;
    let Uphone = req.query.phone;
    let Udob = req.query.dob;
    let Uhash = req.query.password;
    let Uid =  "yuh"; //rand();

    console.log("first: ", Ufirst);
    console.log("last: ", Ulast);
    console.log("email: ", Uemail);
    console.log("phone: ", Uphone);
    console.log("dob: ", Udob);
    //console.log("password hash: ", Uhash);

    /*
        pool.query(
        `INSERT INTO userInfo(firstName, lastName, email, phone, dob, userID, passwordHash, strike) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [Ufirst, Ulast, Uemail, Uphone, Udob, Uid, Uhash, 0]
    ).then((result) => {
        // row was successfully inserted into table
        console.log("Inserted:");
        console.log(result.rows);
        //console.log("i did it\n");
    }).catch((error) => {
        // something went wrong when inserting the row
        console.log(error);
    });
    */
    
});

module.exports = router;