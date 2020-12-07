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

  addTransaction: async (ctx) => {
    try {
      //개발용
      const userId = ctx.request.userInfo?.userId || '5fc75fa3d69e8b4e1f3313ac';
      const accountBookId = '5fc713abd120a78e5c18216d';
      // const { userId } = ctx.request.userInfo;

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
