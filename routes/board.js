const express = require('express');
const router = express.Router();
const connection = require('../config/database');

router.get('/', (req,res) => {
    res.render('board/main');
});

// 게시글 작성
router.get('/register', (req,res) => {
    res.render('board/register');
})

//게시글 작성완료
router.post('/register', (req,res) =>{
    
})

// 게시글 업데이트
router.get('/update', (req,res) => {
    
});

// 게시글 업데이트 완료
router.post('/udpate', (req,res) => {

});

router.get('/delete', (req,res) => {

});

router.post('/delete', (req,res) => {

});
module.exports = router;