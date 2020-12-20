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

  addTransaction: async ({ userId, accountBookId, transactions }) => {
    const accountBook = await AccountBookModel.findOne({
      _id: accountBookId,
    });
    transactions.forEach((transaction) => {
      if (transaction.tag && !accountBook.tags.includes(transaction.tag[0])) {
        accountBook.tags = [...accountBook.tags, ...transaction.tag];
      }

      if (
        transaction.paymentMethod &&
        !accountBook.paymentMethod.includes(transaction.paymentMethod)
      ) {
        accountBook.paymentMethod = [
          ...accountBook.paymentMethod,
          transaction.paymentMethod,
        ];
      }
    });
    await accountBook.save();

    const mappedTransaction = transactions.map((transaction) => {
      return {
        ...transaction,
        userId,
        accountBookId,
        date: new Date(transaction.date),
        tag: transaction.tag || [],
      };
    });

    return await TransactionModel.insertMany(mappedTransaction);
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
  updateTransactionTag: async (accountBookId, oldTag, newTag) => {
    const result = await TransactionModel.updateMany(
      { accountBookId, tag: oldTag },
      { $set: { 'tag.$': newTag } }
    );

    return result;
  },

  deleteTransaction: async ({ ids }) => {
    await TransactionModel.deleteMany({
      _id: {
        $in: ids,
      },
    });
  },

  deleteTransactionTag: async (accountBookId, tagToDelete) => {
    const result = await TransactionModel.updateMany(
      { accountBookId },
      { $pull: { tag: tagToDelete } }
    );

    return result;
  },
};

module.exports = transactionService;
