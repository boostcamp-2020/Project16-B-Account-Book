const transactionService = require('../service/transaction.service');

const transactionController = {
  getTransactions: async (ctx) => {
    try {
      const { accountBookId } = ctx.request.params;

      const transactions = await transactionService.getTransactions({
        accountBookId,
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
      const accountBookId = ctx.header.cookie.replace(/accountBookId=/, '');

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
      const userId = ctx.request.userInfo?.userId;
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
      const transactions = await transactionService.updateTransaction(
        transactionInfo
      );

      ctx.body = transactions;
    } catch (err) {
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
