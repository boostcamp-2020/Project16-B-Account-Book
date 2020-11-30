const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const transactionSchema = new Schema({
  accountBookId: String,
  userId: ObjectId,
  date: { type: Date, default: Date.now },
  category: String,
  paymentMethod: String,
  description: String,
  cost: Number,
  tag: [String],
  imageURL: String,
});

module.exports = mongoose.model('transaction', transactionSchema);
