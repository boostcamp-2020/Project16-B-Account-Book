const mongoose = require('mongoose');
const dbURL = process.env.MONGO_URL;

module.exports = () => {
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', function () {
    console.log('Connected to mongod server');
  });
  mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
};
