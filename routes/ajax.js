const express = require('express');
const router = express.Router();
const connection = require('../config/database');

router.post('/score',(req,res)=>{
    const email = req.body.email;
    const name = req.body.name;
    const score = req.body.score;
    console.log("get data : ", email," score : ",score);
    var resData = {};
    const query = connection.query('select * from dodge where name=?',name,(err,rows)=>{
        console.log(rows);
        if (err) throw err;
        if (rows[0]){
            if (rows[0].score < score){
                const queryUpdate = connection.query('update dodge set score=? where name=?',[score,name],(err,rows)=>{
                    if (err) throw err;
                    console.log("update complete");
                });
                resData.msg = 'New Records!';
            }

            else{
                resData.msg = 'Try Again!';
            }
            res.json(resData);
        }
        else {
            const queryInsert = connection.query('insert into dodge values(?,?,?)',[email,name,score],(err,rows)=>{
                if(err) throw err;
                console.log("insert complete");
                resData.msg = 'Welcome Rookie!';
            })
            res.json(resData);
        }

        
    })
});

module.exports = router;
