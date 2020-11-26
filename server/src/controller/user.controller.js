const userService = require('../service/user.service');

const UserController = {
  test: async (ctx) => {
    try {
      const data = ctx.request.body || 'test';
      const testResult = await userService.test(data);
      if (testResult) {
        ctx.body = `GOOOOD  ${ctx.request.url} ${ctx.response.status}`;
        return;
      }
    } catch (err) {
      ctx.body = 'error';
    }
  },
  update: async (ctx) => {
    try {
      const data = ctx.request.body;
      console.log(data);

      ctx.body = `GOOOOD  ${ctx.request.url} ${ctx.response.status}`;
    } catch (err) {
      ctx.body = 'error';
    }
  },
};

module.exports = UserController;
