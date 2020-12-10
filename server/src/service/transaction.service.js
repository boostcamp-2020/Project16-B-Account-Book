const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const TransactionModel = require('../model/transaction.model');
const AccountBookModel = require('../model/accountBook.model');

const transactionService = {
  getTransactions: async ({ accountBookId }) => {
    const transactions = await TransactionModel.find({
      accountBookId,
    });
    return transactions;
  },

  getAccountBookTransactions: async ({ accountBookId }) => {
    const transactions = await TransactionModel.find({
      accountBookId,
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
    const accountBook = await AccountBookModel.findOne({
      _id: accountBookId,
    });

    if (tag[0] && !accountBook.tags.includes(tag[0])) {
      accountBook.tags = [...accountBook.tags, ...tag];
    }

    if (paymentMethod && !accountBook.paymentMethod.includes(paymentMethod)) {
      accountBook.paymentMethod = [...accountBook.paymentMethod, paymentMethod];
    }

    await accountBook.save();

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
    const { accountBookId } = transactionId;
    const { tag, paymentMethod } = newInfo;

    const accountBook = await AccountBookModel.findOne({
      _id: accountBookId,
    });

    if (tag[0] && !accountBook.tags.includes(tag[0])) {
      accountBook.tags = [...accountBook.tags, ...tag];
    }

    if (paymentMethod && !accountBook.paymentMethod.includes(paymentMethod)) {
      accountBook.paymentMethod = [...accountBook.paymentMethod, paymentMethod];
    }

    await accountBook.save();

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
