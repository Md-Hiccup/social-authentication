/**
 * Created by hussain on 11/4/17.
 */
module.exports = {
    'facebookAuth' : {
        'clientID'      :   process.env.FACEBOOK_APP_ID,
        'clientSecret'  :   process.env.FACEBOOK_APP_SECRET,
        'callbackURL'   :   'http://localhost:3000/auth/facebook/callback'
    }
}