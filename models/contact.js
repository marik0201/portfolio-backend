const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const contactSchema = new Schema({
  adress: {
    type: String,
    required: [true, 'adress is required']
  },
  telephone: {
    type: String,
    required: [true, 'telephone is required']
  },
  email: {
    type: String,
    required: [true, 'email is required']
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('User', contactSchema);
