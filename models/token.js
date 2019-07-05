const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  token: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Token', tokenSchema);
