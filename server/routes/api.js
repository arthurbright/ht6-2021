const express = require('express');

const router = express.Router();

router.get('/hi', (req, res)=>{
    res.json({
        lavan: 420
    })
});

module.exports = router;