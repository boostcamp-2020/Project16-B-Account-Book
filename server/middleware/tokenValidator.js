const JWTTokenUtil = require('../src/util/jwtToken.util');
const UserModel = require('../src/model/user.model');

module.exports = async function (ctx, next) {
  try {
    if (!ctx.header?.authorization) {
      ctx.status = 400;
    }
    const token = ctx.header.authorization.replace(/Bearer /, '');
    if (!token || token == null) {
      ctx.status = 401;
    }

    const tokenInfo = JWTTokenUtil.verifyToken(token);

    const user = await UserModel.findOne({ _id: tokenInfo.data });

    if (!user) {
      ctx.status = 401;
    }

    ctx.request.userInfo = {
      userId: tokenInfo.data,
      name: user.name,
      email: user.email,
      provider: user.provider,
      providerId: user.providerId,
    };

    await next();
  } catch (err) {
    ctx.body = 'err';
  }
};
