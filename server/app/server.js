const express = require('express');
let { Pool } = require("pg");
let env = require("../env.json");
const path = require('path');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const socketModule = require('./routes/socketModule');
socketModule(server);

// Allow cross-origin requests
// This is for development purposes only. Remove this in production.
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

const port = 3000;
const hostname = "localhost";

let pool = new Pool(env);
pool.connect().then(() => {
    console.log("Connected to database");
});

// Example query
/* pool.query("SELECT * FROM auction;")
    .then((result) => {
        console.log(result.rows);
    }) */

// Example route
/*
We can split routes into separate files.
That way, we can keep our code organized and allow each person to
work on a different file to avoid merge conflicts.
*/
const exampleRouter = require('./routes/example');
app.use('/example', exampleRouter);

const getRouter = require('./routes/get');
app.use('/get', getRouter);

const newUserRouter = require('./routes/newUser');
app.use('/newUser', newUserRouter);

const newAuctionRouter = require('./routes/newAuction');
app.use('/newAuction', newAuctionRouter);

const postRouter = require('./routes/post');
app.use('/post', postRouter);
const imageUploadRouter = require('./routes/imageUpload');
app.use('/upload', imageUploadRouter);

const auctionRouter = require('./routes/auction');
app.use('/auction', auctionRouter);

app.get('/', (req, res) => res.send());

server.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
})
