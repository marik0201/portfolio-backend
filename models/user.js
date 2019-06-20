const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Login is required'],
    match: [/(^[0-9a-zA-Z]{1,15}$)/, 'Enter valid login']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', userSchema);
