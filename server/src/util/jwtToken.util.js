const jwt = require('jsonwebtoken');

const JWTTokenUtil = {
  createToken(data) {
    return jwt.sign(
      {
        data,
      },
      process.env.PRIVATE_KEY
    );
  },

  verifyToken(token) {
    return jwt.verify(token, process.env.PRIVATE_KEY);
  },
};

module.exports = JWTTokenUtil;
