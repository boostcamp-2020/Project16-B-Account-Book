const userService = require('../service/user.service');

const UserController = {
  test: async (ctx) => {
    try {
      const data = ctx.request.body || 'test';
      const testResult = await userService.test(data);
      if (testResult) {
        ctx.body = testResult;
        return;
      }
    } catch (err) {
      ctx.body = 'error';
    }
  },
  updateUser: async (ctx) => {
    try {
      const { userInfo } = ctx.request.body;
      const updateInfo = await userService.updateUser(userInfo);

      ctx.body = updateInfo;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  login: async (ctx) => {
    try {
      const { userInfo } = ctx.request;
      const token = await userService.login(userInfo);
      ctx.body = {
        token,
        userInfo: { name: userInfo.name, imageURL: userInfo.imageURL },
      };
    } catch (err) {
      ctx.body = 'error';
    }
  },
  getUser: async (ctx) => {
    const token = ctx.header.authorization.replace(/Bearer /, '');
    const userInfo = await userService.getUser(token);

    ctx.body = userInfo;
  },

  getAccountBookUsers: async (ctx) => {
    const { accountBookId } = ctx.request.userInfo;
    const usersInfo = await userService.getAccountBookUsers(accountBookId);

    ctx.body = usersInfo;
  },

  getInviteUsers: async (ctx) => {
    const { accountBookId } = ctx.request.userInfo;
    const usersInfo = await userService.getInviteUsers(accountBookId);

    ctx.body = usersInfo;
  },

  updateMembers: async (ctx) => {
    const { newMembers, deleteMembers } = ctx.request.body;
    const { accountBookId } = ctx.request.userInfo;

    const usersInfo = await userService.updateMembers(
      accountBookId,
      newMembers,
      deleteMembers
    );

    ctx.body = usersInfo;
  },
};

module.exports = UserController;
