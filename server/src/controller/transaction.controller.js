const transactionService = require('../service/transaction.service');

const transactionController = {
  fetchTransaction: async (ctx) => {
    try {
      //TODO: oauth 미들웨어로 유저 인증 및 데이터 주입.
      const name = ctx.request.body.user || 'gibong';
      const provider = ctx.request.body.provider || 'naver';
      const providerId = ctx.request.body.providerId || '12345';
      const transactions = await transactionService.getUserTransactions(
        name,
        provider,
        providerId
      );
      ctx.body = transactions;
    } catch (err) {
      ctx.body = 'error';
    }
  },
};

module.exports = transactionController;
