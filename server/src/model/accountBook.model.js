const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountBookSchema = new Schema({
  title: String,
  authorizedUsers: [String],
  tags: { type: [String], default: ['가족', '데이트', '선물', '여행', '회사'] },
  paymentMethod: { type: [String], default: [] },
});

module.exports = mongoose.model('accountBook', accountBookSchema);
