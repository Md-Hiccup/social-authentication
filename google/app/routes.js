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

    router.get('/login', function (req, res) {
        res.render('login', {message: req.flash('loginMessage')});
    });
    router.post('/login', passport.authenticate('local-login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));
    
    router.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile', { user : req.user });
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/auth/google', passport.authenticate('google', { scope: [ 'profile', 'email' ]}));

    router.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect : '/profile',
        failureRedirect : '/'
    }));
    router.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

    router.get('/connect/local', function(req, res){
        res.render('connect-local.ejs', { message: req.flash('signupMessage')});
    });

    router.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/connect/local',
        failureFlash: true
    }));
    router.get('/unlink/local', function(req, res){
        var user = req.user;

        user.local.username = null;
        user.local.password = null;

        user.save(function(err){
            if(err)
                throw err;
            res.redirect('/profile');
        });
    });

    router.get('/unlink/google', function(req, res){
        var user = req.user;
        user.google.token = null;

        user.save(function(err){
            if(err)
                throw err;
        res.redirect('/profile');
        });
    });



/*
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
*/

module.exports = router;


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else {
        res.redirect('/login');
    }
}