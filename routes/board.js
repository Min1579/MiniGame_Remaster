const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

router.get('/', (req,res) => {
    pool.getConnection((err, conn) => {
        conn.query('select * from board order by no desc', (err,rows) => {
            const blist = [];
            rows.forEach(row => {
                console.log(row);
                const list = {};
                list.no = row.no;
                list.title = row.title;
                list.name = row.name;
                list.postdate = row.postdate,
                list.view = row.view;
                blist.push(list)
            })
            conn.release();
            res.render('board/main', {'board_list': blist});
        })
    })
});
// 게시글 작성
router.get('/register', (req, res) => {
    if (!req.user) res.redirect('/login')
    return res.render('board/register')
})


//게시글 작성완료
router.post('/register', (req,res) => {
    const sql = {}
    pool.getConnection((err,connection) => {
        connection.query('select email from user where name=?',[req.user], (err,rows) => {
            sql.email = rows[0].email;
            connection.release();
        })
    })

    pool.getConnection((err, connection) => {
        sql.name = req.user;
        sql.title = req.body.title,
        sql.content = req.body.content,
        sql.postdate = (new Date()).toDateString();
        sql.view = 0;
        sql.b_pwd = req.body.pwd;
        console.log(sql);
        connection.query('insert into board set ?', [sql], (err,rows) => {
            connection.release();
            res.redirect('/board')
        });
    })
    
})


// 게시글 업데이트

router.get('/update', (req, res) => {
    const no = req.query.no;
    const title = req.query.title;
    const content = req.query.content;
    const name = req.query.name;
    const postdate = req.query.postdate;
    console.log(no, title, content, name, postdate);

    res.render('board/update', {
        no: no,
        title: title,
        content: content,
        name: name,
        postdate: postdate
    })
})

// 게시글 업데이트 완료
router.post('/update', (req, res) => {
    const no = req.body.no;
    const title = req.body.title;
    const content = req.body.content;
    const postdate = `(modified) ${(new Date()).toDateString()}`;
    const name = req.body.name;

    if (req.user != name) res.redirect('/login');
    console.log(`title:${title}, content :${content}, name:${name}, no:${no}`);

    pool.getConnection((err, rows) => {
        if (err) throw err;
        connection.query(`update board set title='${title}',content='${content}', postdate='${postdate}' where no='${no}'`, (err, rows) => {
            if (err) throw err;
            connection.release();
        })
    })
    return res.redirect(`/board/b?no=${no}`);
});

router.get('/delete', (req, res) => {
    console.log('delete process started!');

    const name = req.query.name;
    const no = req.query.no;
    console.log(`no: ${req.query.no}, name:${name}, auth:${req.user}`);

    if (req.user != name) {
        res.redirect('/login')
    }
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('delete from board where no =?', [no], (err, rows) => {
            connection.release();
        })
        res.redirect('/board');
    });
});


router.get('/delete_reply', (req, res) => {
    const query = req.query;
    const no = query.no;
    const name = query.name;


    if (name !== req.user) {
        res.redirect('/login');
    }
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`delete from reply where no='${no}' and name='${req.user}'`, (err, rows) => {
            connection.release();
            res.redirect(`/board/b?no=${req.query.origin_no}`)
        })
    })
})

router.post('/post_reply', (req, res) => {
    const r = {};
    const pageNum = req.body.ref;
    pool.getConnection((err, conn) => {
        const body = req.body;
        r.ref = body.ref;
        r.r_content = body.r_content;
        r.postdate = (new Date()).toDateString();
        r.name = req.user;
        console.log(r);
        conn.query('insert into reply set ?', [r], (err, rows) => {
            console.log('reply inserted');
            conn.release()
            res.redirect(`/board/b?no=${pageNum}`);
        })
    });
});

router.get('/b', (req,res) => {
    const no = req.query.no || req.params.no;
    const post = {};
    const replies = [];
    pool.getConnection((err, connection) => {
        connection.query('update board set view=view+1 where no = ?', [no], (err, rows) => {
            console.log('view updated!');
            connection.release();
        })
    });
    pool.getConnection((err,conn)=> {
        conn.query('select * from board where no=?',[no],(err,rows)=>{
            post.no = no;
            post.title = rows[0].title;
            post.name = rows[0].name;
            post.postdate = rows[0].postdate;
            post.content = rows[0].content;
            conn.release();
        })
    })
    pool.getConnection((err, conn) => {
        conn.query('select * from reply where ref = ?', [no],(err,rows) => {
            rows.forEach(row => {
                const reply = {};
                reply.name = row.name;
                reply.no = row.no;
                reply.postdate = row.postdate;
                reply.r_content = row.r_content;
                replies.push(reply);
            })
            conn.release();
            res.render('board/post', {p:post, replies:replies});
        })
    })


})


module.exports = router;