const { DataTypes } = require("sequelize");
const sequelize = require("./db"); // Update the path

const Auction = sequelize.define("Auction", {
    host: DataTypes.STRING,
    auctionid: DataTypes.INTEGER,
    minbid: DataTypes.NUMERIC,
    productname: DataTypes.STRING,
    productdesc: DataTypes.STRING,
    auctiontype: DataTypes.STRING,
    starttime: DataTypes.DATE,
    endtime: DataTypes.DATE,
    timeperiod: DataTypes.STRING,
});

module.exports = Auction;
