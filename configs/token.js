const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

const tokenConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'secretKey',
  tokenLife: '15m',
  refreshTokenKey: 'accessSecretKey',
  refreshTokenLife: '2h'
};

module.exports = tokenConfig;
