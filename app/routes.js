/**
 * Created by hussain on 10/4/17.
 */
var User = require('./models/user');
var express = require('express');
var router = express.Router();
var passport = require('../config/passport');

    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/signup', function (req, res) {
        res.render('signup', {message: req.flash('signupMessage')});
    });
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /*router.post('/signup', function (req, res) {
     var newUser = new User();
     newUser.local.username = req.body.email;
     newUser.local.password = req.body.password;
     newUser.save(function(err){
     if(err)
     throw  err;
     });
     res.redirect("/");
     });
     */
    router.get('/:username/:password', function (req, res) {
        var newUser = new User();
        newUser.local.username = req.params.username;
        newUser.local.password = req.params.password;
        console.log(newUser.local.username + ' ' + newUser.local.password);
        newUser.save(function (err) {
            if (err)
                throw  err;
        });
        res.send("Success");
    });

module.exports = router;