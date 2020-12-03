const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountBookSchema = new Schema({
  title: String,
  authorizedUsers: [String],
  tags: { type: [String], default: [] },
  paymentMethod: { type: [String], default: [] },
});

module.exports = mongoose.model('accountBook', accountBookSchema);
