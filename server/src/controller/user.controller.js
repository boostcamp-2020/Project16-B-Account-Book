const userService = require('../service/user.service');

const UserController = {
  test: async (ctx) => {
    try {
      const data = ctx.req.body || 'test';
      const testResult = await userService.test(data);
      if (testResult) {
        ctx.body = `GOOOOD  ${ctx.request.url} ${ctx.res.status}`;
        return;
      }
    } catch (err) {
      ctx.body = 'error';
    }
  },
};

module.exports = UserController;
