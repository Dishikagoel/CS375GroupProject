const express = require('express');
const { Pool } = require("pg");
const env = require("../../env.json");
const router = express.Router();
const pool = new Pool(env);

// GET request to fetch al auctions
// To test run: curl http://localhost:3000/get/auction
router.get('/auction', (req, res) => {
    pool.query("SELECT * FROM auction;")
        .then((result) => {
            const rows = result.rows;
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            console.error("Error querying database:", error);
            res.status(500).json({ error: "An error occurred while fetching data." });
        });
});

// GET request to fetch user info based on user ID
// To test run: curl http://localhost:3000/get/userinfo/0001
router.get('/userinfo/:userId', (req, res) => {
    const userId = req.params.userId;

    pool.query("SELECT * FROM userinfo WHERE userid = $1;", [userId])
        .then((result) => {
            const rows = result.rows;
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            console.error("Error querying database:", error);
            res.status(500).json({ error: "An error occurred while fetching data." });
        });
});

// GET request to retrieve bid information for a specific auction ID
// To test run: curl http://localhost:3000/get/bid/testing/
router.get('/bid/:auctionid', (req, res) => {
    const auctionid = req.params.auctionid;

    pool.query("SELECT * FROM bid WHERE auctionid = $1;", [auctionid])
        .then((result) => {
            const rows = result.rows;
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            console.error("Error querying database:", error);
            res.status(500).json({ error: "An error occurred while fetching data." });
        });
});

// GET request to retrieve bid information for a specific auction ID and user ID
// To test run: curl http://localhost:3000/get/bid/testing/testing
router.get('/bid/:auctionid/:userid', (req, res) => {
    const auctionid = req.params.auctionid;
    const userid = req.params.userid;

    pool.query("SELECT * FROM bid WHERE auctionid = $1 AND userid = $2;", [auctionid, userid])
        .then((result) => {
            const rows = result.rows;
            console.log(rows);
            res.json(rows);
        })
        .catch((error) => {
            console.error("Error querying database:", error);
            res.status(500).json({ error: "An error occurred while fetching data." });
        });
});

module.exports = router;