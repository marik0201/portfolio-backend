const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
  shortText: {
    type: String,
    required: [true, 'shortText is required']
  },
  title: {
    type: String,
    required: [true, 'title is required']
  },
  text: {
    type: String,
    required: [true, 'text is required']
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('About', aboutSchema);
