const express = require('express');
const router = express.Router();
const pool = require('../db');
const transporter = require('../mailer');

function decideWinner(userBidMap, auctionType) {
    let sortedBids = Object.keys(userBidMap).sort((a, b) => userBidMap[b] - userBidMap[a]);
    const sortedBidsMap = {};

    if (auctionType.toLowerCase() === 'first-bid sealed' || auctionType.toLowerCase() === 'open-ascending') {
        let i = 0;
        sortedBids.forEach((key) => {
            sortedBidsMap[key] = {
                finalBid: userBidMap[key],
                rank: i
            }
            i++;
        });
    } 
    else if (auctionType.toLowerCase() === 'second-bid sealed') {
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

async function getAuctionInfo(auctionid) {
    try {
        const result = await pool.query("SELECT * FROM auction WHERE auctionid = $1;", [auctionid]);
        const rows = result.rows;
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error querying database:", error);
        return null;
    }
}

async function getUserInfo(userid) {
    try {
        const result = await pool.query("SELECT * FROM userinfo WHERE userid = $1;", [userid]);
        const rows = result.rows;
        if (rows.length > 0) {
            console.log("Found user:", rows);
            return rows[0];
        } else {
            console.log("User not found for userid:", userid);
            return null;
        }
    } catch (error) {
        console.error("Error querying database:", error);
        return null;
    }
}

router.post("/save-sealed-bid", async (req, res) => {
    try {
        const bidData = [req.body.userid, req.body.auctionid, req.body.bid];
        const updateQuery = `
            UPDATE bid
            SET finalbid = $3
            WHERE userid = $1 AND auctionid = $2;
        `;
        await pool.query(updateQuery, bidData);
        return res.send("saved sealed bid");
    } catch (error) {
        console.error("Error querying database:", error);
        return res.status(500).send("Error querying database");
    }
});


router.post("/submit-bids", async (req, res) => {
    try {
        const auctionid = req.body.auctionid;
        const userBidMap = await getUserBidMap(auctionid);
        const auctionInfo = await getAuctionInfo(auctionid);
        const auctionType = auctionInfo.auctiontype;
        const productName = auctionInfo.productname;
        const productDesc = auctionInfo.productdesc;
        const hostName = auctionInfo.host;
        const hostInfo = await getUserInfo(auctionInfo.userid);
        const hostEmail = hostInfo.email;
        const hostPhone = hostInfo.phone;
        const productUrl = `/product/${auctionid}`

        if (userBidMap) {
            const rankings = decideWinner(userBidMap, auctionType);

            const updateQuery = `UPDATE bid SET ranking = $1 WHERE userid = $2 AND auctionid = $3`;
            for (let userid in rankings) {
                const ranking = rankings[userid].rank;
                await pool.query(updateQuery, [ranking, userid, auctionid]);
            }

            // Get the winner info based on their ID
            const winnerUserId = Object.keys(rankings).filter((userId) => rankings[userId].rank === 0)[0];
            const winnerInfo = await getUserInfo(winnerUserId);
            const winnerEmail = winnerInfo.email;

            // Compose and send the email to the winner
            const mailOptions = {
                from: 'webay524@gmail.com',
                to: winnerEmail,
                subject: 'Congratulations! You Won the Auction!',
                html: `
                    <div style="background-color: #f0f0f0; padding: 20px; text-align: center;" xmlns="http://www.w3.org/1999/html">
                        <h1>Congratulations! You Won the Auction!</h1>
                        <div style="background-color: white; border: 3px solid #ddd; padding: 10px; margin-top: 10px;">
                            <h2>Auction Details</h2>
                            <p><strong>Auction ID:</strong> ${auctionid}</p
                            <p><strong>Host Name:</strong> ${hostName}</p
                            <p><strong>Product Name:</strong> ${productName}</p>
                            <p><strong>Product Description:</strong> ${productDesc}</p>
                            <p><strong>Auction Type:</strong> ${auctionType}</p>
                            </div>
                            <div style="background-color: white; border: 3px solid #ddd; padding: 10px; margin-top: 10px;">
                            <p><strong>For information on payment and delivery methods please contact the host at:</strong></p>
                             <p><strong>Phone: </strong> ${hostPhone}</p>
                             <p><strong>Email: </strong> ${hostEmail}</p>
                            <a href="${productUrl}" target="_blank">View Product</a>
                        </div>
                        <p style="font-size: 12px; margin-top: 20px;">Thank you for participating in our auction!</p>
                    </div>
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Email could not be sent:', error);
                } else {
                    console.log(`Email sent to: userid: ${winnerUserId}\n`);
                }
            });
        }

        return res.send("hi");
    } catch (error) {
        console.error("Error querying database:", error);
        return res.status(500).send("Error querying database");
    }
});


module.exports = router;
