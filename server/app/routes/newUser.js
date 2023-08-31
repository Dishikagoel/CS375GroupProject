const express = require('express');
const router = express.Router();
//const path = require('path');
const env = require("../../env.json");
const { Pool } = require("pg");
const pool = new Pool(env);

// GET /example/hello
// To test run: curl http://localhost:3000/newUser/add
router.get("/add", (req, res) => {
   // console.log("hello there")
});

router.get("/addUser", (req, res) => {
    //console.log("account initialization page\n");

    let Ufirst = req.query.first;
   // console.log("first: ", Ufirst);
    
    let Ulast = req.query.last;
    let Uemail = req.query.email;
    let Uphone = req.query.phone;
    let Udob = req.query.dob;
    //let Uhash = req.query.password;
    let Uid =  rand();
    let Uaddress = req.query.address;

   /*
    console.log("first: ", Ufirst);
    console.log("last: ", Ulast);
    console.log("email: ", Uemail);
    console.log("phone: ", Uphone);
    console.log("dob: ", Udob);
    console.log("address: ", Uaddress);
    //console.log("password hash: ", Uhash);
    */

    pool.query(
        `INSERT INTO userInfo(userid, email, firstname, lastname, dob, phone, address, strikes) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [Uid, Uemail, Ufirst, Ulast, Udob, Uphone, Uaddress, 0]
    ).then((result) => {
        // row was successfully inserted into table
        console.log("Inserted:");
        console.log(result.rows);
    }).catch((error) => {
        // something went wrong when inserting the row
        console.log("error in routes");
        console.log(error);
    });
    
});

function hashPW(str) {
    //console.log("fill in function body");
    return str;
}

function validPW(str1, str2) {
    //compare for equality
    //compare for validity
    //return array of a boolean and a string message
}

function rand() {
    let chars = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars[(Math.floor(Math.random() * chars.length))];
    }
    return result;
}

module.exports = router;