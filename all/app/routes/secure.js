/**
 * Created by hussain on 11/4/17.
 */
var express = require('express');
var router = express.Router();
//var passport = require('../config/passport');

router.get('/', function (req, res) {
    res.redirect('/auth');
});

router.use(function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/auth/login');
    }
//    res.redirect('/auth');
});

router.get('/profile', function(req, res){
    res.render('profile', { user: req.user });
});

router.get('/*', function(req, res){
    res.redirect('/profile');
});

module.exports = router ;


