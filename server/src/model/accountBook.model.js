const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountBookSchema = new Schema({
  title: String,
  authorizedUsers: [String],
  tags: [String],
});

module.exports = mongoose.model('accountBook', accountBookSchema);
