const transactionService = require('../service/transaction.service');

const transactionController = {
  getUserTransactions: async (ctx) => {
    try {
      //개발용
      const userId = ctx.request.userInfo?.userId || '5fc75fa3d69e8b4e1f3313ac';

      const transactions = await transactionService.getUserTransactions({
        userId,
      });

      ctx.body = transactions;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  getAccountBookTransactions: async (ctx) => {
    try {
      const accountBookId = ctx.header?.cookie.replace(/accountBookId=/, '');
      const transactions = await transactionService.getAccountBookTransactions({
        accountBookId,
      });
      ctx.body = transactions;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  getCalendarTransactions: async (ctx) => {
    try {
      const { year, month } = ctx.request.params;
      const { accountbookid: accountBookId } = ctx.request.header;

      const transactions = await transactionService.getCalendarTransactions({
        accountBookId,
        year,
        month,
      });

      ctx.body = transactions;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  addTransaction: async (ctx) => {
    try {
      //개발용
      const userId = ctx.request.userInfo?.userId || '5fc75fa3d69e8b4e1f3313ac';
      const accountBookId = ctx.header?.cookie.replace(/accountBookId=/, '');

      const result = await transactionService.addTransaction({
        userId,
        accountBookId,
        ...ctx.request.body,
      });

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  updateTransaction: async (ctx) => {
    try {
      const transactionInfo = ctx.request.body;
      console.log(transactionInfo);
      const transactions = await transactionService.updateTransaction(
        transactionInfo
      );

      ctx.body = transactions;
    } catch (err) {
      //ctx.body = 'error';
      ctx.throw(err.code, err);
    }
  },

  deleteTransaction: async (ctx) => {
    try {
      const { transactionIds } = ctx.request.body;

      const transactions = await transactionService.deleteTransaction({
        ids: transactionIds,
      });

      ctx.body = transactions;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
};

module.exports = transactionController;
