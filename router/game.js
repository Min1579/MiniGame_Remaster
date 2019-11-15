const express = require('express');
const router = express.Router();
const io = require('../app');

router.get('/1', (req,res) => {
    res.render('catchmymind/main');
});



module.exports = router;
