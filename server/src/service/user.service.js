const newError = require('../util/error');
const UserModel = require('../model/user.model');
const JWTTokenUtil = require('../util/jwtToken.util');

const UserService = {
  test: async (data) => {
    const testResult = await UserModel.find();

    if (testResult) {
      return `test result ${testResult}`;
    }

    throw new Error('BAD REQUEST');
  },
  login: async ({ name, email, provider, providerId, imageURL }) => {
    let userId;
    const user = await UserModel.findOne({ name, provider, providerId });

    if (user && (user.imageURL !== imageURL || user.name !== name)) {
      user.imageURL = imageURL;
      user.name = name;
      await user.save();
    }

    if (!user) {
      const newUser = new UserModel({
        name,
        email,
        provider,
        providerId,
        imageURL,
      });
      await newUser.save();
      userId = newUser._id;
    }

    return JWTTokenUtil.createToken(userId || user._id);
  },

  getUser: async (token) => {
    const tokenInfo = JWTTokenUtil.verifyToken(token);
    const userInfo = await UserModel.findOne({ _id: tokenInfo.data });

    if (userInfo) {
      return userInfo;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 token을 다시 확인해주세요.',
    });
  },
};

module.exports = UserService;
