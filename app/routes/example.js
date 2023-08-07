const express = require('express');
const router = express.Router();

// GET /example/hello
router.get('/hello', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;
