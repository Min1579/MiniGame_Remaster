const express = require('express');
const router = express.Router();

/* GET home page. */

router.get('/logout', (req,res) => {
    console.log('logout');
    req.logOut();
    res.redirect('/');
})

router.get('/', (req, res) => {
  console.log('index loaded', req.user);
  const name = req.user;
  res.render('index', {user : { 
    'name' : name 
  }});
});

module.exports = router;
