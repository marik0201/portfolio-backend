const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  address: {
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
  isVisible: {
    type: Boolean,
    default: true
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Contact', contactSchema);
