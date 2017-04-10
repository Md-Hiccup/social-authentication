var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
//var Promise = require("bluebird");
var bodyParser = require('body-parser');

var routes = require('./app/routes');

var configDb = require('./conifg/database');
mongoose.connect(configDb.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function (callbck) {
    console.log("Conncetion Succeeded")
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
    secret : 'anytext',
    saveUninitialized : true,
    resave: true
}));

app.use('/', routes);

app.listen(port);
console.log("server running on port : ",port);

module.exports = (app);