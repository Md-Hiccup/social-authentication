/**
 * Created by hussain on 10/4/17.
 */
var mongoose =require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
    local:{
        username : String,
        password : String
    }
});

userSchema.methods.generateHash = function (password) {
    var salt = bcrypt.genSaltSync(13);
    var hash = bcrypt.hashSync(password,salt);
    return hash ;
};

userSchema.methods.validPassword = function(password){
    var compare = bcrypt.compareSync(password, this.local.password);
    return compare;
};

module.exports = mongoose.model('User', userSchema);