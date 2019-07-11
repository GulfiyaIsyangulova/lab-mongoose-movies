const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

const passport = require('passport');

const ensureLogin = require("connect-ensure-login");


router.get('/signup', (req, res, next)=>{

    res.render('user-views/signupPage');
})


router.post('/signup', (req, res, next)=>{

    const theUsername = req.body.theUsername;
    const thePassword = req.body.thePassword;


    // if thePasssword or theUsername doesnt exist
    // set req.flash('error') equal to "please enter both credentials"
    // redirect back to sign up page
    



    const salt = bcrypt.genSaltSync(10);
    const hashedPassWord =  bcrypt.hashSync(thePassword, salt);

    User.create({
        username:theUsername,
        password: hashedPassWord
    })
    .then(()=>{
        console.log('yay');
        req.flash('success'," User succesfully created. You may now login.")
        res.redirect('/')
    })
    .catch((err)=>{
        next(err);
    })
})


router.get('/login', (req, res, next)=>{
    res.render('user-views/loginPage')
})


router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true,
    passReqToCallback: true
  }));


// router.get('/profile', (req, res, next)=>{

//     if(req.session.currentUser){

//         res.render('user-views/profile', {user: req.session.currentUser})

//     } else {
//         req.session.errorCount = 1;
//         req.session.errorMessage = "Sorry, you must be logged in to use that feature please log in"
//         res.redirect('/login')
//     }
// })

router.post('/logout', (req, res, next)=>{
    req.logout();
    res.redirect("/login");
  })




module.exports = router;