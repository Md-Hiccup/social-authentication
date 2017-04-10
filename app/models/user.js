/**
 * Created by hussain on 10/4/17.
 */
var mongoose =require('mongoose');

var userSchema = mongoose.Schema({
    local:{
        username : String,
        password : String
    }
});

module.exports = mongoose.model('User', userSchema);