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
    let auctionid = req.body.auctionid;
    let minBid = req.body.minBid;
    let prodName = req.body.title;
    let prodDesc = req.body.prodDesc;
    let auctType = req.body.auctType;
    let start =  req.body.start;
    let end = req.body.end;
    let timePeriod = req.body.timePeriod;
    let active = req.body.active;

    pool.query(`
                UPDATE auction
                SET
                    host = $1,
                    minbid = $2,
                    productname = $3,
                    productdesc = $4,
                    auctiontype = $5,
                    starttime = $6,
                    endtime = $7,
                    timeperiod = $8,
                    active = $9
                WHERE auctionid = $10
                    RETURNING *
        `,
        [host, minBid, prodName, prodDesc, auctType, start, end, timePeriod, true, auctionid],
        ).then((result) => {
    }).catch((error) => {
        console.log(error);
    });
    
});

module.exports = router;