const express = require('express');
const router = express.Router();
const pool = require('../config/database');



router.get('/', (req,res) => {
    if(!req.user) {
        res.redirect('/login');
    } else {
        pool.getConnection((err,conn) => {
            conn.query('select email from user where name=?', [req.user],(err,rows) => {
                const email = rows[0].email;
                conn.release();
                res.render('mypage/main', {email:email, name:req.user});
            })
        })
    }
})

router.post('/update', (req,res) => {
    const comment = req.body.comment;
    const email = req.body.email;
    console.log('####',comment);
    console.log('####',email);
    
    pool.getConnection((err,conn) => {
        conn.query('update user set comment = ? where email = ? ',[comment, email], (err,rows)=> {
            conn.release();
            res.redirect('/mypage');
        })
    })
})

module.exports = router;