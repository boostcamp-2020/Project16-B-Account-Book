const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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

  getCalendarTransactions: async ({ accountBookId, year, month }) => {
    const transactionList = await TransactionModel.aggregate([
      {
        $project: {
          _id: 1,
          accountBookId: 1,
          category: 1,
          paymentMethod: 1,
          description: 1,
          cost: 1,
          tag: 1,
          type: 1,
          month: { $month: '$date' },
          year: { $year: '$date' },
          day: { $dayOfMonth: '$date' },
        },
      },
      {
        $match: {
          accountBookId: ObjectId(accountBookId),
          month: Number(month),
          year: Number(year),
        },
      },
    ]);

    return transactionList;
  },

  updateTransaction: async (transactionInfo) => {
    const { transactionId, ...newInfo } = transactionInfo;

    const transaction = await TransactionModel.updateOne(
      { _id: transactionId },
      { $set: { ...newInfo } }
    );

    return transaction;
  },

  deleteTransaction: async ({ ids }) => {
    await TransactionModel.deleteMany({
      _id: {
        $in: ids,
      },
    });
  },
};

module.exports = transactionService;
