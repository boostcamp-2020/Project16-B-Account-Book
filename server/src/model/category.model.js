const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: String,
});

module.exports = mongoose.model('category', categorySchema);
