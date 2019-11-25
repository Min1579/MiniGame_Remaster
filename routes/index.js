const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const bodyParser = require('body-parser')
/* GET home page. */

router.get('/logout', (req,res) => {
    console.log('logout');
    req.logOut();
    res.redirect('/');
})

router.get('/', (req, res) => {
  console.log('index loaded', req.user); 
  console.log(req.user);
  const name  = req.user;
  
  res.render('index', {user : { 
    'name' : name}});
});

module.exports = router;
