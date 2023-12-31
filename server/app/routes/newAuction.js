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
    let starttime =  req.body.start;
    let endtime = req.body.end;
    let timePeriod = req.body.timePeriod;
    let active = req.body.active;
    let user = req.body.userid;

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
            active = $9,
            userid = $11
        WHERE auctionid = $10
        RETURNING *
    `,
        [host, minBid, prodName, prodDesc, auctType, starttime, endtime, timePeriod, true, auctionid, user])
        .then((result) => {
            res.json(result.rows);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

module.exports = router;