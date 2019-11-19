const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('../database/db');
const bodyParser = require('body-parser');

router.get('/mypage', (req,res) => {
    res.render('mypage');
})

router.get('/board', (req,res) => {
    res.render('board');
})

router.get('/rank', (req,res) => {
    res.render('rank');
});

router.get('/login', (req,res) => {
    res.render('login')
});

router.get('/join', (req,res) => {
    console.log('get join url');
    const errMsg = req.flash('error');
    if (errMsg) {
        res.render('join.ejs', {'message' : errMsg})
    }
})



//passport.serializeUser((user,done) => {})
//router.get('/join', (req,res) => {
//    res.render('join');
//});
// passport 설정 , 회원가입
passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',    
    passwordField: "password",
    passReqCallback: true
}, (req, email, pwd, done) => {
    console.log('local-join callback called!');
    const query = connection.query('select * from user where id="'+ email+'"' ,(err,rows) => {
        if (err) throw done(err);
        
        if(rows.length > 0) {
            console.log('user id used!');
            return done(null, false, {message : 'your email is already being used!'});
        } else {
            console.log(email);
            console.log(pwd);
            console.log(name);
            const query = connection.query('insert into user values("'+email+'","'+pwd+'","'+name+'")',(err, rows) => {
            if (err) throw err;
            return done(null, {'email':email});
            })}
    });
}));

router.post('/join', passport.authenticate('local-join',{
    successRedirect: '/login',
    failureRedirect: '/join',
    failureFlash: true 
}));
 
router.get('/', (req,res) => {
    res.render('index');
});

module.exports = router;