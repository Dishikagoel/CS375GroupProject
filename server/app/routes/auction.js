const express = require('express');
const router = express.Router();
const pool = require('../db');

function decideWinner(userBidMap, auctionType) {
    let sortedBids = Object.keys(userBidMap).sort((a, b) => userBidMap[b] - userBidMap[a]);
    const sortedBidsMap = {};

    if (auctionType === 'seal-highest-bid' || auctionType === 'open-ascending') {
        let i = 0;
        sortedBids.forEach((key) => {
            sortedBidsMap[key] = {
                finalBid: userBidMap[key],
                rank: i
            }
            i++;
        });
    } 
    else if (auctionType === 'seal-second-highest') {
        for (let i=0; i < sortedBids.length; i++) {
            if (i+1 >= sortedBids.length) {
                sortedBidsMap[sortedBids[i]] = userBidMap[sortedBids[i]];
            } else {
                sortedBidsMap[sortedBids[i]] = userBidMap[sortedBids[i+1]];
            }
        }
    }

    return sortedBidsMap;
}

async function getUserBidMap(auctionid) {
    const userBidMap = {};

    try {
        const result = await pool.query("SELECT * FROM bid WHERE auctionid = $1;", [auctionid]);
        const rows = result.rows;
        for (let row of rows) {
            userBidMap[row.userid] = row.finalbid;
        }
        
        return userBidMap;

    } catch (error) {
        console.error("Error querying database:", error);
        return {};
    }
}

async function getAuctionType(auctionid) {
    try {
        const result = await pool.query("SELECT auctiontype FROM auction WHERE auctionid = $1;", [auctionid]);
        const rows = result.rows;
        return rows[0].auctiontype;
    } catch (error) {
        console.error("Error querying database:", error);
        return "";
    }
}

router.post("/submit-bids", async (req, res) => {
    try {
        const auctionid = req.body.auctionid;
        const userBidMap = await getUserBidMap(auctionid);
        const auctionType = await getAuctionType(auctionid);

        if (userBidMap) {
            const rankings = decideWinner(userBidMap, auctionType);

            const updateQuery = `UPDATE bid SET ranking = $1 WHERE userid = $2 AND auctionid = $3`;
            for (let userid in rankings) {
                const ranking = rankings[userid].rank;
                await pool.query(updateQuery, [ranking, userid, auctionid]);
            }
        }

        // FUTURE: Send notification to winner

        return res.send("hi");
    } catch (error) {
        console.error("Error querying database:", error);
        return res.status(500).send("Error querying database");
    }
});


module.exports = router;
