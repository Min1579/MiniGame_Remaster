const express = require('express');
const router = express.Router();
const connection = require('../config/database');

router.get('/', (req,res) => {
    if(req.user === undefined) {
        res.redirect('/login');
    }
    const query = connection.query('select name from user where email = ?', [req.user], (err, rows) => {
        if(err) throw err;
        
    })
    console.log(req.user.email);
    res.render('mypage/main',{'email':req.user});
})

module.exports = router;