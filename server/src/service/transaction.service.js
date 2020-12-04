const TransactionModel = require('../model/transaction.model');

const transactionService = {
  getUserTransactions: async ({ userId }) => {
    const transactions = await TransactionModel.find({
      userId: userId,
    });
    return transactions;
  },

  addTransaction: async ({
    userId,
    accountBookId,
    category,
    paymentMethod,
    description,
    imageURL,
    cost,
    tag,
    date,
  }) => {
    const transaction = new TransactionModel({
      userId,
      accountBookId,
      category,
      paymentMethod,
      description,
      imageURL,
      cost,
      tag,
      date,
    });
    await transaction.save();
  },

  updateTransaction: async (transactionInfo) => {
    const { transactionId, ...newInfo } = transactionInfo;

    const transaction = await TransactionModel.updateOne(
      { _id: transactionId },
      { $set: { ...newInfo } }
    );

    return transaction;
  },

  deleteTransaction: async ({ id }) => {
    await TransactionModel.deleteOne({ _id: id });
  },
};

module.exports = transactionService;
