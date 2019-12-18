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
            console.log("list is....", list);
            connection.release();
            res.render('rank/main',{'list':list});
        })
    })
})

router.get('/', (req,res) => {
    pool.getConnection((err,connection) => {
        connection.query('select * from dodge order by score desc', (err,rows) =>{
            connection.release();
            console.log("정윤이 바보",rows);
            res.render('rank/main',{"list":[{
                name: (typeof rows === "undefined") ? null : rows.name,
                score: (typeof rows ==="undefined") ? null : rows.score
            }]});
        })
    })
    //res.render('rank/main');
})


module.exports = router;