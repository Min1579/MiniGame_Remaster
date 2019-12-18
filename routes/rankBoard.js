const express = require('express');
const router = express.Router();
const pool = require('../config/database');


router.get('/catchMyMind', (req, res) => {
    const rank_list = []
    pool.getConnection((err, conn) => {
        conn.query('select name, score, comment from user natural join cmm order by score desc', (err, rows) => {
            rows.forEach(row => {
                const rank = {};
                rank.name = row.name;
                rank.score = row.score;
                rank.comment = row.comment;
                rank_list.push(rank);
            })
            conn.release();
            res.render('rank/cmm', {rank_list: rank_list});
        })
    })
})

router.get('/desertwar', (req, res) => {
    const rank_list = []
    pool.getConnection((err, conn) => {
        conn.query('select name, score, comment from user natural join desertwar order by score desc', (err, rows) => {
            rows.forEach(row => {
                const rank = {};
                rank.name = row.name;
                rank.score = row.score;
                rank.comment = row.comment;
                rank_list.push(rank);
            })
            conn.release();
            res.render('rank/desertwar', {rank_list: rank_list});
        })
    })
})


router.get('/dodge', (req, res) => {
    const rank_list = [];
    pool.getConnection((err, conn) => {
        conn.query('select name, score, comment from user natural join dodge order by score desc', (err, rows) => {
            rows.forEach(row => {
                const rank = {};
                rank.name = row.name;
                rank.score = row.score;
                rank.comment = row.comment;
                console.log(rank);
                
                rank_list.push(rank);
            })
            conn.release();
            res.render('rank/dodge', {rank_list: rank_list});
        })
    })
})

router.get('/', (req, res) => {
    res.render('rank/main', {
        message: 'Check Your Ranking'
    });
})


module.exports = router;