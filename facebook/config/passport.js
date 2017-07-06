/**
 * Created by hussain on 10/4/17.
 */
var LocalStrategy = require('passport-local').Strategy;
var passport= require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('../app/models/user');
var fs = require('fs');

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },  function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({'local.username': email}, function (err, user) {
                if (err)
                    return done(err);
                if (user)
                    return done(null, false, req.flash('signupMessage', 'That email already taken'));
                 if(!req.user) {
                    var newUser = new User();
                    newUser.local.username = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    })
                } else {
                     var user = req.user;
                     user.local.username = email;
                     user.local.password = user.generateHash(password);

                     user.save(function(err){
                         if(err)
                             throw err;
                         return done(null, user);
                     })
                 }
            })
        })
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField:  'email',
        passwordField:  'password',
        passReqToCallback:  true
    },
     function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({'local.username': email}, function (err, user) {
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, req.flash('loginMessage', 'No user found'));
                if(!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Invalid password'));
                return done(null, user);
                })
        })
    }));

    passport.use(new FacebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'name','email', 'gender', 'profileUrl'],
        passReqToCallback: true
    },
     function(req, accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            //user is not logged in yet
            console.log(profile);
            console.log();
            if(!req.user) {
                User.findOne({'facebook.id': profile.id}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        if(!user.facebook.token){
                            user.facebook.token = accessToken;
                            user.facebook.name = profile.name.givenName +' '+ profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;
                            user.save(function(err){
                                if(err)
                                    throw err;
                            });
                        }
                        return done(null, user);
                    } else {
                        var newUser = new User();
                        newUser.facebook.id = profile.id;
                        newUser.facebook.token = accessToken;
                        newUser.facebook.name = profile.name.givenName+' '+ profile.name.familyName;
                        newUser.facebook.email = (profile.emails[0].value || '');

                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                  //  console.log(profile.image);
                });
                //user is logged in already, and needs to be merged
            } else {
                var user = req.user;
                user.facebook.id = profile.id;
                user.facebook.token = accessToken;
                user.facebook.name = profile.name.givenName +''+ profile.name.familyName;
                user.facebook.email = profile.emails[0].value;

                user.save(function(err){
                    if(err)
                        throw err;
                    return done(null, user);
                });
            }
         });
      }
    ));

module.exports = passport;