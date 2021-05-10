const passport = require('passport');
const facebookStrategy = require('passport-facebook').Strategy;
const userController = require('../controllers/user.controller');

module.exports = () => {
    passport.use(
        new facebookStrategy(
          {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
            profileFields: ['id', 'first_name', 'last_name', 'picture.type(large)', 'email']
          },
          function(accessToken, refreshToken, profile, done) {
            const { id, first_name, last_name, picture, email } = profile._json;
            const newUser = {
              fName: first_name,
              lName: last_name,
              userPhoto: picture,
              email: email,
              facebookId: id
            }
            userController.createUser(newUser);
            done(null, profile);
          }
        )
      )
}
