const express = require('express');
let { Pool } = require("pg");
let env = require("../env.json");
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/public/'));

const port = 3000;
const hostname = "localhost";

let pool = new Pool(env);
pool.connect().then(() => {
    console.log("Connected to database");
});

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

app.get('/', (req, res) => res.send());

app.listen(port, hostname, () => {
    console.log(`Listening at: http://${hostname}:${port}`);
})