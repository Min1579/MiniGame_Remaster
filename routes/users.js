const express = require('express');
const router = express.Router();



router.post('/login_proc', (req,res) =>{
  const userInfo = {};
  userInfo.id = req.body.id;
  userInfo.pwd = req.body.pwd;
  console.log(JSON.stringify(userInfo));
  // {id : id , pwd:pwd}
  /*
    db관련
   */

  res.render('test.pug', { id:userInfo.id });
});

router.get('/join', (req,res) => {
  const userInfo = {};
  with (userInfo) {
    id = req.body.id;
    nickname = req.body.nickname;
    pwd = req.body.pwd;
    mail = req.body.mail;
  };

  /*
    db 저장
   */

  res.redirect('index.pug');
});

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


module.exports = router;
