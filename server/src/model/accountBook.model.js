const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountBookSchema = new Schema({
  title: String,
  authorizedUsers: [String],
  deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('accountBook', accountBookSchema);
