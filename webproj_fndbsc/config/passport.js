const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({id}, (err, user) => {
    cb(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passportField: 'password'
},
  ((email, password, cb) => {
    User.findOne({email: email})
      .then((user) => {
        if (!user) {
          return cb(null, false, {message: 'User not found'});
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (!res) {
            return cb(null, false, {message: err});
          }

          return cb(null, user, {message: 'Login Successful'});
        });
      })
      .catch((err) => {
        return cb(err);
      });
  })
));
