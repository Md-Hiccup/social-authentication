/**
 * Created by hussain on 11/4/17.
 */
module.exports = {
    'googleAuth' : {
        'clientID'      :   process.env.CLIENT_ID,
        'clientSecret'  :   process.env.CLIENT_SECRET,
        'callbackURL'   :   'http://localhost:3000/auth/google/callback'
    }
};