const TransactionModel = require('../model/transaction.model');
const UserModel = require('../model/user.model');
const newError = require('../util/error');

const transactionService = {
  getUserTransactions: async (name, provider, providerId) => {
    const userdata = await UserModel.findOne({
      name,
      provider,
      providerId,
    });
    if (userdata) {
      const transactions = await TransactionModel.find({
        userId: userdata._id,
      });
      return transactions;
    }

    //throw new Error('BAD REQUEST');
    throw newError({
      status: 'BAD REQUEST',
      msg: '존재하지 않는 사용자입니다.',
    });
  },
};

module.exports = transactionService;
