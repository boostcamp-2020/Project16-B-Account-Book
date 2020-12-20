const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const transactionSchema = new Schema({
  accountBookId: ObjectId,
  userId: ObjectId,
  date: { type: Date, default: Date.now },
  category: { type: String, default: '미분류' },
  paymentMethod: String,
  description: String,
  cost: Number,
  tag: [String],
  imageURL: String,
  type: { type: String, default: '지출' },
});

module.exports = mongoose.model('transaction', transactionSchema);
