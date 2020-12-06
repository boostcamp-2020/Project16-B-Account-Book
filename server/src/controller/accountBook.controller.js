const accountBookService = require('../service/accountBook.service');

const accountBookController = {
  getAllAccountBooks: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBooks = await accountBookService.getAllAccountBooks(userId);

      ctx.body = accountBooks;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  getAccountBook: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBookId = ctx.cookies.get('accountBookId');
      const accountBook = await accountBookService.getAccountBook(
        userId,
        accountBookId
      );

      ctx.body = accountBook;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  createAccountBook: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const { title } = ctx.request.body;
      const accountBook = await accountBookService.createAccountBook(
        userId,
        title
      );

      ctx.body = accountBook;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  deleteAccountBook: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBookId = ctx.cookies.get('accountBookId');
      const result = await accountBookService.deleteAccountBook(
        userId,
        accountBookId
      );

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  updateAccountBook: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBookId = ctx.cookies.get('accountBookId');
      const { newTitle } = ctx.request.body;
      const result = await accountBookService.updateAccountBookTitle(
        userId,
        accountBookId,
        newTitle
      );

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  addAccountBookUsers: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBookId = ctx.cookies.get('accountBookId');
      const { newUsers } = ctx.request.body;
      const result = await accountBookService.updateAccountBook(
        userId,
        accountBookId,
        newUsers
      );

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  addAccountBookTag: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBookId = ctx.cookies.get('accountBookId');
      const { newTag } = ctx.request.body;
      const result = await accountBookService.addAccountBookTag(
        userId,
        accountBookId,
        newTag
      );

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  updateAccountBookTag: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBookId = ctx.cookies.get('accountBookId');
      const { originalTag, newTag } = ctx.request.body;
      const result = await accountBookService.updateAccountBookTag(
        userId,
        accountBookId,
        originalTag,
        newTag
      );

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  deleteAccountBookTag: async (ctx) => {
    try {
      const userId = ctx.request.userInfo?.userId || '5fc8454fda706fc9acfc94c4';
      const accountBookId = ctx.cookies.get('accountBookId');
      const { tagName: tag } = ctx.request.params;
      const result = await accountBookService.deleteAccountBookTag(
        userId,
        accountBookId,
        tag
      );

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
};

module.exports = accountBookController;
