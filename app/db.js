const { Sequelize } = require("sequelize");
const env = require("../env.json");

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

module.exports = sequelize;
