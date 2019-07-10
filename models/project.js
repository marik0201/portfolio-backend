const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  image: { type: String },
  projectName: { type: String, required: [true, 'projectName is required'] },
  readme: { type: String },
  projectLanguage: { type: String },
  isEdited: { type: Boolean, default: false },
  projectUrl: { type: String, required: [true, 'projectUrl is required'] },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Project', projectSchema);
