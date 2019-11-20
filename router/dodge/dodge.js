const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('game03/main');
});

module.exports = router;