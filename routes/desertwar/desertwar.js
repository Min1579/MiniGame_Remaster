const express = require('express');
const router = express.Router();
const connection = require('../../config/database');

router.get('/',(req,res) => {
      res.render('desertwar/main');
});

router.post('/sendScore',(req,res)=> {
     const score = req.body.score;
      console.log(score);
      resData = {};
      const query = connection.query('insert into desertwar values(?,?,?)',["1233@1233","1233",score],(err,rows)=>{
            if (err) throw error;
            res.json(resData);
      })
})
module.exports = router;