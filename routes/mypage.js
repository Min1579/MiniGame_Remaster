const express = require('express');
const router = express.Router();
const connection = require('../config/database');



router.get('/', (req,res) => {
    if(!req.user) {
        res.redirect('/login');
    } else {
        const query = connection.query('select email from user where name = ?', [req.user], (err, rows) => {
            if(err) throw err;
            res.render('mypage/main',{'email': rows[0].email, 'name':req.user});
        })   
    }
})

router.post('/', (req,res) => {
    
})

module.exports = router;