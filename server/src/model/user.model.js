const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  provider: String,
  providerId: String,
  startDayOfWeek: { type: String, default: 'Sun' },
  startDateOfMonth: { type: Number, default: 1 },
  imageURL: String,
  createAt: { type: Date, default: Date.now },
  paymentMethod: [String],
  tag: [String],
});

module.exports = mongoose.model('user', userSchema);
