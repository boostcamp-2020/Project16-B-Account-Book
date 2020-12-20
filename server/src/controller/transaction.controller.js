const transactionService = require('../service/transaction.service');

const transactionController = {
  getTransactions: async (ctx) => {
    try {
      const { accountBookId } = ctx.request.userInfo;

      const transactions = await transactionService.getTransactions({
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
      const { accountBookId } = ctx.request.userInfo;

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
      const { accountBookId, userId } = ctx.request.userInfo;
      const { transactions } = ctx.request.body;
      const result = await transactionService.addTransaction({
        userId,
        accountBookId,
        transactions,
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
  updateTransactionTag: async (ctx) => {
    try {
      const { accountBookId } = ctx.request.userInfo;
      const { oldTag, newTag } = ctx.request.body;
      const result = await transactionService.updateTransactionTag(
        accountBookId,
        oldTag,
        newTag
      );

      ctx.body = result;
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

  deleteTransactionTag: async (ctx) => {
    try {
      const { accountBookId } = ctx.request.userInfo;
      const { tag } = ctx.request.params;
      const result = await transactionService.deleteTransactionTag(
        accountBookId,
        tag
      );

      ctx.body = result;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
};

module.exports = transactionController;
