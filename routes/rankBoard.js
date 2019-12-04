const express = require('express');
const router = express.Router();
const pool = require('../config/database');


router.get('/catchMyMind', (req,res) => {
    pool.getConnection((err,connection) => {
        connection.query('select * from board order by point desc', (err,rows) =>{
            res.render('rank/main',{rows:rows});
        })
    })
})

router.get('/', (req,res) => {
    res.render('rank/main');
})


module.exports = router;