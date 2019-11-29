const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const bodyParser = require('body-parser');
const path = require('path');

router.get('/', (req, res) => {
    const query = connection.query('select * from board order by no desc', (err, rows) => {
        const blist = [];
        if (err) throw err;
        rows.forEach(row => {
            blist.push({
                no: row.no,
                title: row.title,
                writer: row.name,
                postdate: row.postdate,
                view: row.view
            });
        });
        res.render('board/main', {
            'list': blist
        })
    })
});

// 게시글 작성
router.get('/register', (req, res) => {
    if (!req.user) res.redirect('/login')
    res.render('board/register')
})

//게시글 작성완료
router.post('/register', (req, res) => {

    const query = connection.query('select email from user where name = ?', [req.user], (err, rows) => {
        if (err) throw err;
        const sql = {
            'email': rows[0].email,
            'name': req.user,
            'title': req.body.title,
            'content': req.body.content,
            'postdate': (new Date()).toDateString(),
            'view': 0,
            'b_pwd': req.body.pwd
        }
        console.log(sql);

        const query = connection.query('insert into board set ?', [sql], (err, rows) => {
            if (err) throw err;
            console.log('board added!');
        })
        res.redirect('/board')
    })
})

// 게시글 업데이트
router.get('/update', (req, res) => {
    const query = req.query;
    const title = query.title;
    const content = query.content;
    const postdate = query.postdate;
    const name = query.name;

    res.render('board/update', {
        title: title,
        content: content,
        postdate,
        name: name
    });
});

// 게시글 업데이트 완료
router.post('/udpate', (req, res) => {
    const body = req.body;
    const title = body.title;

});

router.get('/delete', (req, res) => {

});

router.post('/delete', (req, res) => {

});


router.get('/delete_reply', (req,res) => {
    const query = req.query;
    const no = query.no;
    const name = query.name;
    

    if(name !== req.user) { res.redirect('/login'); }

    const replyDeleteQuery = connection.query('delete from reply where no=? and name=?',[no, req.user], (err, rows) => {
        if(err) throw err;
        res.redirect(`/board/b?no=${req.query.origin_no}`)
    })
})

router.post('/post_reply', (req, res) => {
    const body = req.body;
    const r = {
        ref: body.ref,
        r_content: body.r_content,
        postdate: (new Date()).toDateString(),
        name: req.user
    };
    console.log(r);

    const query = connection.query('insert into reply set ?', [r], (err, rows) => {
        if (err) throw err;
        console.log('reply insert');
        res.redirect(`/board/b?no=${req.body.ref}`)
    })
});

router.get('/b', (req, res) => {
    const viewQuery = connection.query('update board set view=view+1 where no = ?', [req.query.no], (err, rows) => {
        if (err) throw err;
        console.log('view updated!');
    })
    const p = {};
    
    const bQuery = connection.query('select * from board where no =?', [req.query.no || req.body.no], (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            p.no = req.query.no || req.body.no;
            p.title = rows[0].title;
            p.name = rows[0].name;
            p.postdate = rows[0].postdate;
            p.content = rows[0].content;
        }
        const replies = [];
        const rQuery = connection.query('select * from reply where ref = ? order by no asc', [req.query.no || req.body.no], (err, rows) => {
            if (err) throw err;
            rows.forEach(row => {
                const r = {
                    no: row.no,
                    name: row.name,
                    r_content: row.r_content,
                    postdate: row.postdate,
                }
                console.log(r);
                replies.push(r);
                console.log(replies);
            })
            res.render('board/post', {
                p: p,
                replies: replies
            });
        })
    })
})
module.exports = router;