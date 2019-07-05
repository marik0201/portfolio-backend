const express = require('express');
const bcrypt = require('bcrypt');
const authRouter = express.Router();
const tokenConfig = require('../configs/token');
const User = require('../models/user');
const Token = require('../models/token');
const auth = require('../middlewares/auth');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('secretKeyRaccon');

authRouter.post('/login', async (req, res) => {
  const { login, password } = req.body;

  if (!login && !password) {
    return res.status(400).json({
      message: 'Fields are required'
    });
  }

  try {
    const user = await User.findOne({ username: login });
    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        message: 'Wrong login or password'
      });
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, tokenConfig.secretOrKey, {
      expiresIn: tokenConfig.tokenLife
    });
    const refreshToken = await cryptr.encrypt(token);

    await Token.findOneAndDelete({ userId: user._id });

    const newRefreshToken = new Token({
      token: refreshToken,
      userId: user._id
    });

    newRefreshToken.save();

    return res.json({
      token,
      refreshToken
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Wrong login or password'
    });
  }

  //   await User.findByIdAndUpdate(user._id, { refreshToken });

  //   return res.json({
  //     token,
  //     refreshToken
  //   });
  // } catch (error) {
  //   return res.status(400).json({
  //     message: 'Wrong login or password'
  //   });
  // }
});

authRouter.post('/token', async (req, res) => {
  const token = req.body.token;
  const decodedToken = cryptr.decrypt(token);
  const payload = jwt.decode(decodedToken);

  if (!payload) {
    return res.sendStatus(400);
  }

  try {
    const user = await Token.find({ userId: payload.id, token });

    if (!user) {
      return res.sendStatus(400);
    }

    const newToken = jwt.sign({ id: payload.id }, tokenConfig.secretOrKey, {
      expiresIn: tokenConfig.tokenLife
    });

    const refreshToken = cryptr.encrypt(decodedToken);

    await Token.findOneAndUpdate(
      { userId: payload.id },
      { token: refreshToken }
    );

    res.json({
      token: newToken,
      refreshToken
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

authRouter.post('/token/reject', async (req, res) => {
  const token = req.body.token;
  const decodedToken = cryptr.decrypt(token);
  const payload = jwt.decode(decodedToken);

  if (!payload) {
    return res.sendStatus(400);
  }

  Token.findOneAndDelete({ userId: payload.id }, (err, data) => {
    if (err) {
      res.send(400);
    } else {
      res.send(204);
    }
  });
});

module.exports = authRouter;
