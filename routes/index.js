const express = require('express');
const router = express.Router();
const passport = require('../middlewares/auth');
const profile = require('./profile');
const auth = require('./auth');
const admin = require('./admin');

router.use('/api/profile', profile);
router.use('/api/auth', auth);
router.use('/api/admin', passport.authenticate(), admin);

module.exports = router;
