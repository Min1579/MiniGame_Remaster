const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const pool = require('../config/database');
const mysql = require('mysql2');


/* local-join 회원가입 */ 
router.get('/', (req,res) => {
    //flash message
    const message = req.flash('error');
    console.log('get-> /register');
    res.render('member/register', {'message': message});
});

router.post('/' ,passport.authenticate('local-join', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true
}));

passport.serializeUser((user, done) => {
    console.log('serialized');
    console.log('session saved');
    console.log('result : ' +  user);
    //done(null, user);
    done(null, user);
});

passport.deserializeUser((user,done) => {
    console.log('deserialize');
    done(null, user);
});

passport.use('local-join', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pwd',
    passReqToCallback: true
}, (req, email, pwd, done) => {
    const user = {
        email:email,
        pwd:pwd,
        name: req.body.name
    };
    pool.getConnection((err,connection) => {
        connection.query('select email from user where email = ?',[email], (err,rows) => {
            if(err) throw err;
            if(rows.length > 0) {
                console.log('this email is being used');
                connection.release();
                return done(null,false,{message : `${email} is being used`});
            } 
        })
    })
    pool.getConnection((err,connection) => {
        connection.query('select name from user where email = ?',[req.body.name], (err,rows) => {
            if(err) throw err;
            console.log('#################',rows[0].name);
            if(rows.length > 0) {
                console.log('this name  is being used');
                connection.release();
                return done(null,false,{message : `${req.body.name} is being used`});
            } 
        })
    })
    pool.getConnection((err,connection) => {
        connection.query(`insert into user set ?`,[user], (err,rows) => {
            connection.release();
            return done(null, user.name);
        })
    })
    
}));



module.exports = router;
