const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('user', userSchema);
