const express = require('express');
const router = express.Router();
const connection = require('../../config/database');

router.get('/',(req,res) => {
    req.user === undefined ? name = 'Guest' : name = req.user;
    res.render('game03/main',{'name':name});
});

router.post('/getScore',(req,res)=>{
    const name = req.body.name;
    resData = {};
    console.log("name : " ,name);
    const query = connection.query('select score from dodge where name=?',name,(err,rows)=>{
        if (err) throw error;
        if (rows[0]){
            resData.score = rows[0].score;
        }
        else {
            resData.score = 0;
        }

        console.log(resData);
        res.json(resData);
    })
});
router.post('/getEmail',(req,res)=>{
    const name = req.body.name;
    resData = {};
    const query = connection.query('select email from user where name=?',name,(err,rows)=>{
        if (err) throw error;
        if (rows[0]){
            resData.email = rows[0].email;
        }
        else {
            resData.email = 'Guest@Guest';
        }
        console.log(resData);
        res.json(resData);
    });
})

router.post('/updateScore',(req,res)=>{
    const email = req.body.email;
    const score = req.body.score;
    console.log(email,score);
    var resData = {};
    const query = connection.query('update dodge set score = ? where email = ?',[score,email],(err,rows)=>{
        if (err) throw error;
        console.log('update score');
        resData.msg = "New Records!";
        res.json(resData);
    })

});

router.post('/insertScore',(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const score = req.body.score;
    var resData = {};
    console.log(email,name,score);
    const query = connection.query('insert into dodge values(?,?,?)',[email,name,score],(err,rows)=>{
        if (err) throw error;
        console.log('insert score');
        resData.msg = "New Records!";
        res.json(resData);
    })

});

module.exports = router;