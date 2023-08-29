const express = require('express');
const { Pool } = require("pg");
const env = require("../../env.json");
const router = express.Router();
const pool = new Pool(env);

router.post('/login', async (req, res) => {
    const { user, pass } = req.body;
    console.log(user, pass);

    const query = 'SELECT * FROM userInfo WHERE userid = $1';
    const { rows } = await pool.query(query, [user]);

    if (rows.length === 0) {
        return res.status(401).json({message: 'User not found'});
    }

    const userDb = rows[0];

    if (pass === userDb.password) {
        return res.json({user: user, pass: pass});
    }
    res.status(401).json({message: 'Incorrect passowrd'});
})

module.exports = router;
