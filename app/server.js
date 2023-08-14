const express = require("express");
const { Sequelize } = require("sequelize");
const env = require("../env.json");

const app = express();

app.use(express.json());

const port = 3000;
const hostname = "localhost";

const sequelize = new Sequelize({
    database: env.database,
    username: env.user,
    password: env.password,
    host: env.host,
    port: env.port,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

const Auction = sequelize.define("Auction", {
    host: Sequelize.STRING,
    auctionid: Sequelize.INTEGER,
    minbid: Sequelize.NUMERIC,
    productname: Sequelize.STRING,
    productdesc: Sequelize.STRING,
    auctiontype: Sequelize.STRING,
    starttime: Sequelize.DATE,
    endtime: Sequelize.DATE,
    timeperiod: Sequelize.STRING,
});

// Test the database connection
sequelize
    .authenticate()
    .then(async () => {
        console.log("Connected to the database successfully!");

        // Fetch all rows from the "auction" table
        const allAuction = await Auction.findAll();

        // Print each auction in the console
        console.log("All Auction:");
        allAuction.forEach(auction => {
            console.log(auction.toJSON()); // Convert to JSON for better formatting
        });
    })
    .catch(error => {
        console.error("Unable to connect to the database:", error);
    });

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
});
