const express = require('express');
const router = express.Router();


router.get('/1', (req,res) => {
    res.render('catchmymind/');
});


module.exports = router;
