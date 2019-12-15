const express = require('express');
const router = express.Router();
const pool = require('../../config/database');

router.get('/',(req,res) => {
      req.user === undefined ? name = 'Guest' : name = req.user;
      res.render('desertwar/main',{'name':name});

});

router.post('/updateScore',(req,res)=>{
      const email = req.body.email;
      const score = req.body.score;
      console.log(email,score);
      pool.getConnection((err,connection)=>{
          connection.query('update desertwar set score = ? where email = ?',[score,email],(err,rows)=>{
              if (err) throw err;
              console.log('update score');
              res.json({msg:"New Records!"});
              connection.release();
          })
      })
  });
  
  router.post('/insertScore',(req,res)=>{
      const email = req.body.email;
      const name = req.body.name;
      const score = req.body.score;
      console.log(email,name,score);
      pool.getConnection((err,connection)=>{
          connection.query('insert into desertwar values(?,?,?)',[email,name,score],(err,rows)=>{
              if (err) throw err;
              console.log('insert score');
              res.json({msg:"New Records!"});
              connection.release();
          })
      })
  });
  router.post('/getScore',(req,res)=>{
      const name = req.body.name;
      resData = {};
      console.log("name : " ,name);
      pool.getConnection((err,connection)=>{
          connection.query('select score from desertwar where name=?',name,(err,rows)=>{
              if (err) throw err;
              if (rows[0]){
                  resData.score = rows[0].score;
              }
              else {
                  resData.score = 0;
              }
              connection.release();
          })
          connection.query('select email from user where name=?',name,(err,rows)=>{
              if (err) throw err;
              if (rows[0]){
                  resData.email = rows[0].email;
              }
              else {
                  resData.email = "Guest@Guest";
              }
              console.log(resData);
              res.json(resData);
              connection.release();
          })
      })
  });
module.exports = router;