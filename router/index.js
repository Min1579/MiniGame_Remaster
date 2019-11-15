const express = require('express');
const router = express.Router();

router.get('/mypage', (req,res) => {
    res.render('mypage');
})

router.get('/board', (req,res) => {
    res.render('board');
})

router.get('/rank', (req,res) => {
    res.render('rank');
});

router.get('/login', (req,res) => {
    res.render('login')
});

router.get('/join', (req,res) => {
    res.render('join');
});

router.get('/', (req,res) => {
    res.render('index');
});

module.exports = router;