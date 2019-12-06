const express = require('express');
const router = express.Router();
const pool = require('../config/database');


router.get('/catchMyMind', (req,res) => {
    pool.getConnection((err,connection) => {
        const list = [];
        connection.query('select * from board order by point desc', (err,rows) =>{
            rows.forEach(row => {
                list.push({
                    name:row.name,
                    point:row.point
                });
            });
            console.log(list);
            connection.release();
            res.render('rank/main',{'list':list});
        })
    })
})

router.get('/dodge', (req,res) => {
    pool.getConnection((err,conn)=> {
        if(!err) {
            
        }
    })
})

router.get('/', (req,res) => {
    res.render('rank/main');
})


module.exports = router;