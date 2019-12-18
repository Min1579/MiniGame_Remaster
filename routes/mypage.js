const express = require('express');
const router = express.Router();
const pool = require('../config/database');



router.get('/', (req,res) => {
    if(!req.user) {
        res.redirect('/login');
    } else {
        pool.getConnection

        const query = connection.query('select email from user where name = ?', [req.user], (err, rows) => {
            if(err) throw err;
            res.render('mypage/main',{'email': rows[0].email, 'name':req.user});
        })   
    }
})

router.post('/update', (req,res) => {
    const comment = req.body.commnet;
    const email = req.body.email;
    pool.getConnection(err,conn => {
        conn.query('update user set comment = ? where email = ? ',[comment, email], (err,rows)=> {
            conn.release();

        })
    })
})

module.exports = router;