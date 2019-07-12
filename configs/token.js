const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

const tokenConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: 'secretKey',
  tokenLife: '30m',
  refreshTokenKey: 'accessSecretKey',
  refreshTokenLife: '10h'
};

module.exports = tokenConfig;
