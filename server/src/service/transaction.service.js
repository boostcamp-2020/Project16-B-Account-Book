const TransactionModel = require('../model/transaction.model');
const UserModel = require('../model/user.model');

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

    throw new Error('BAD REQUEST');
  },
};

module.exports = transactionService;
