const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const pool = require('../../config/database');

router.post('/ajax', (req,res)=>{
    pool.getConnection((err,connection) => {
        connection.query(`select * from catchmymind where name = '${req.user}'`, (err,rows) => {
            if(err) throw err;
            if(rows[0]) {
                connection.query('udpate catchmymind set point = point + 10', (err, rows) => {
                    console.log('point add');
                })
                connection.release();
            } else {
                connection.query(`select * from user where name = '${req.user}'`,(err,rows) => {
                    const sql = {email:rows.email, name:req.user, point:10};
                    connection.query('insert into catchmymind set ?', [sql], (err,rows) => {
                        console.log('insert success!');
                        connection.release();
                    })
                })
            }
        })
    })
    const responseData = {msg:'점수가 추가되었습니다!'}
    res.json(responseData);
})