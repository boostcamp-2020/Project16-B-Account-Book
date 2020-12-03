const accountBookService = require('../service/accountBook.service');

const accountBookController = {
  getAllAccountBooks: async (ctx) => {
    try {
      // TODO: ctx.request.header에서 JWT를 추출해 decode 를 하거나
      // middleware를 거쳐 인증이되면 ctx에 userId 속성을 하나 넣어놓고 사용해도 편할 듯
      const { userid: userId } = ctx.request.header;
      const accountBooks = await accountBookService.getAllAccountBooks(userId);

      ctx.body = accountBooks;
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  getAccountBook: async (ctx) => {
    try {
      const { userid: userId } = ctx.request.header; // TODO: 위와 같다
      const { accountBookId } = ctx.params;
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
      const { userid: userId } = ctx.request.header; // TODO: 위와 같다
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
      const { userid: userId } = ctx.request.header; // TODO: 위와 같다
      const { accountBookId } = ctx.params;
      const accountBook = await accountBookService.deleteAccountBook(
        userId,
        accountBookId
      );

      ctx.body = accountBook;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
  updateAccountBook: async (ctx) => {
    try {
      const { userid: userId } = ctx.request.header; // TODO: 위와 같다
      const { accountBookId } = ctx.params;
      const { newTitle, newUsers } = ctx.request.body;
      const accountBook = await accountBookService.updateAccountBook(
        userId,
        accountBookId,
        newTitle,
        newUsers
      );

      ctx.body = accountBook;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
};

module.exports = accountBookController;
