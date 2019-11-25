const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    req.user === undefined ? name = 'Guest' : name = req.user;
    res.render('game03/main',{'name':name});
});

module.exports = router;