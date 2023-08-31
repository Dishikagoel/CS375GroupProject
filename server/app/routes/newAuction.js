const express = require('express');
const router = express.Router();
//const path = require('path');
const env = require("../../env.json");
const { Pool } = require("pg");
const pool = new Pool(env);

// GET /example/hello
router.get("/add", (req, res) => {
});

router.post("/addAuction", (req, res) => {
    //console.log("auction creation page\n");

    let host = req.body.host;
    let auctionid = rand();
    let minBid = req.body.minBid;
    let prodName = req.body.title;
    let prodDesc = req.body.prodDesc;
    let auctType = req.body.auctType;
    let start =  req.body.start;
    let end = req.body.end;
    let timePeriod = req.body.timePeriod;
    let active = req.body.active;
    let images = req.body.imagesList;

    pool.query(
        `INSERT INTO auction(host, auctionid, minbid, productname, productdesc, auctiontype, starttime, endtime, timeperiod, active, image_urls) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [host, auctionid, minBid, prodName, prodDesc, auctType, start, end, timePeriod, true, images]
    ).then((result) => {
        // row was successfully inserted into table
        console.log(result.rows)
    }).catch((error) => {
        // something went wrong when inserting the row
        console.log(error);
    });
    
});

function rand() {
    let chars = '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars[(Math.floor(Math.random() * chars.length))];
    }
    return result;
}

module.exports = router;