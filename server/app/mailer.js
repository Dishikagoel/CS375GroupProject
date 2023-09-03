const nodemailer = require('nodemailer');
const env = require("../env.json");

const transporter = nodemailer.createTransport({
    host: env.service,
    port: 465,
    secure: true,
    auth: {
        user: env.auth.user,
        pass: env.auth.pass,
    },
});

module.exports = transporter;
