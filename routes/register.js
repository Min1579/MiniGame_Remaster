const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const connection = require('../config/database');


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
}, async (req, email, pwd, done) => {
    console.log('local-join callback called!');
    const query = connection.query(`select email from user where email = ${email}`, (err, rows) => {
        if (err) done(err); // done 비동기 처리 
        console.log('######################',rows.length);
        
        if (rows.length)  {
            console.log(`${email} is already in use`);
            return done(null, false, {message : `${email} is already in use`}); //두번쨰 false -> failure Redirect , message -> flash
        } else {
            const query = connection.query('select name from user where name = ?', [req.body.name],  async (err, rows) => {
                if (err) done(err);
                if(rows.length) {
                    return done(null, false, {message: `${req.body.name} is already in use`});
                } else {
                    const user = {
                        email:email, 
                        pwd: pwd,
                        name:req.body.name
                    }
                    const query = connection.query('insert into user set ?' , user, (err,rows) => {
                        console.log(user);
                        console.log('user added!');
                        return done(null, user.name);
                    });
                }
            })
        }
    })
}));



module.exports = router;
