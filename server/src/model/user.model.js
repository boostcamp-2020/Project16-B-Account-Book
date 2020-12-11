const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  provider: String,
  providerId: String,
  startDayOfWeek: { type: String, default: 'Sun' },
  startDateOfMonth: { type: Number, default: 1 },
  imageURL: {
    type: String,
    default: 'https://simpleicon.com/wp-content/uploads/user1.svg',
  },
  createAt: { type: Date, default: Date.now },
  paymentMethod: { type: [String], default: [] },
  tag: { type: [String], default: [] },
});

module.exports = mongoose.model('user', userSchema);
