const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'public/images');
  },
  filename: function(req, file, callback) {
    callback(null, 'avatar.png');
  }
});

const upload = multer({ storage }).single('avatar');

module.exports = upload;
