const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/user');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const tokenConfig = require('../configs/token');
// const jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
// jwtOptions.secretOrKey = 'secretKey';

const strategy = new JwtStrategy(tokenConfig, (jwt_payload, next) => {
  const user = User.findOne({ _id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});

passport.use(strategy);

module.exports = {
  initialize: function() {
    return passport.initialize();
  },
  authenticate: function() {
    return passport.authenticate('jwt', { session: false });
  }
};
