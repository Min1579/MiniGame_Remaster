const express = require('express');
const router = express.Router();
const connection = require('../config/database');


router.get('/catchMyMind', (req,res) => {
    //
})

router.get('/', (req,res) => {
    res.render('rank/main');
})


module.exports = router;