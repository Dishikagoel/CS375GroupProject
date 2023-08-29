const express = require('express');
const router = express.Router();
//const path = require('path');
const env = require("../../env.json");
const { Pool } = require("pg");
const pool = new Pool(env);

// GET /example/hello
router.get("/add", (req, res) => {
});

router.get("/addAuction", (req, res) => {
    console.log("auction creation page\n");

    let host = req.query.host;
    let auctionid = req.query.auctionid;
    let minBid = req.query.minBid;
    let prodName = req.query.prodName;
    let prodDesc = req.query.prodDesc;
    let auctType = req.query.auctType;
    let start =  req.query.start;
    let end = req.query.end;
    let timePeriod = req.query.timePeriod;
    let active = req.query.active;
    let image = req.query.image;

    /*
    console.log("host name: ", host);
    console.log("auction ID: ", auctionid);
    console.log("minimum bid: ", minBid);
    console.log("product name: ", prodName);
    console.log("product description: ", prodDesc);
    console.log("auction Type: ", auctType);
    console.log("start time: ", start);
    console.log("end time: ", end);
    console.log("time period: ", timePeriod);
    console.log("active: ", active);
    console.log("image: ", image);
    */

    pool.query(
        `INSERT INTO auction(host, auctionid, minbid, productname, productdesc, auctiontype, starttime, endtime, timeperiod, active, image_urls) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *`,
        [host, auctionid, minBid, prodName, prodDesc, auctType, start, end, timePeriod, true, null]
    ).then((result) => {
        // row was successfully inserted into table
        console.log("Inserted:");
        console.log(result.rows);
    }).catch((error) => {
        // something went wrong when inserting the row
        console.log(error);
    });
    
});

module.exports = router;