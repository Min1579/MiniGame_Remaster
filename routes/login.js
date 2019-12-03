const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const connection = require('../config/database');
const session = require('express-session')
const mysql = require('mysql2');

router.get('/', (req,res) => {
    //flash message
    const message = req.flash('error');
    console.log('get-> /login');
    res.render('member/login', {'message': message});
});

passport.serializeUser((user, done) => {
    console.log('serialized');
    console.log('session saved');
    //done(null, user);
    done(null, user);
});

passport.deserializeUser((user,done) => {
    console.log('deserialize');
    done(null, user);
});

router.post('/' ,passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd',
    passReqToCallback: true
}, async (req, email, pwd, done) => {
    console.log('local-login callback called!');
    pool.query(`select email,pwd,name from user where email=${email} and pwd = ${pwd}`, (err, rows) => {
        if(err) return done(err);
        if(rows.length){
            console.log('result : ', email, rows[0].name);
            const user = {
                email: rows[0].email,
                name: rows[0].name
            }
            return done(null, user.name);
        } else {
            return done(null, false, {'message' : 'login information not matched!'});
            //message -> info 로 들어감
        }
    })
}));

module.exports = router;