const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const newError = require('../util/error');
const TransactionModel = require('../model/transaction.model');
const AccountBookModel = require('../model/accountBook.model');

const PaymentService = {
  getPayments: async (accountBookId) => {
    const { paymentMethod } = await AccountBookModel.findOne({
      _id: accountBookId,
    });

    if (paymentMethod) {
      return paymentMethod;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 가계부에 결제수단이 존재하지 않습니다.',
    });
  },

  getTransactions: async (cardName, accountBookId, type, year, month) => {
    let transactionList = null;

    switch (type) {
      case 'all':
        transactionList = await TransactionModel.aggregate([
          {
            $project: {
              paymentMethod: 1,
              accountBookId: 1,
              category: 1,
              cost: 1,
              month: { $month: '$date' },
              year: { $year: '$date' },
            },
          },
          {
            $match: {
              paymentMethod: cardName,
              accountBookId: ObjectId(accountBookId),
              month: Number(month),
              year: Number(year),
            },
          },
          {
            $group: {
              _id: '$category',
              cost: { $sum: '$cost' },
            },
          },
        ]);
        break;
      case 'income':
        transactionList = await TransactionModel.aggregate([
          {
            $match: {
              paymentMethod: cardName,
              accountBookId: ObjectId(accountBookId),
              type: '수입',
            },
          },
          {
            $group: {
              _id: '$category',
              cost: { $sum: '$cost' },
            },
          },
        ]);
        break;
      case 'expenditure':
        transactionList = await TransactionModel.aggregate([
          {
            $match: {
              paymentMethod: cardName,
              accountBookId: ObjectId(accountBookId),
              type: '지출',
            },
          },
          {
            $group: {
              _id: '$category',
              cost: { $sum: '$cost' },
            },
          },
        ]);
        break;
    }

    if (transactionList) {
      let totalCost = 0;

      for (let transaction of transactionList) {
        totalCost += transaction.cost;
      }

      switch (type) {
        case 'all':
          transactionList.push({ title: `📢 수입/지출 내역 : ${totalCost}원` });
          break;
        case 'income':
          transactionList.push({ title: `💰 수입 내역 : ${totalCost}원` });
          break;
        case 'expenditure':
          transactionList.push({ title: `💸 지출 내역 : ${totalCost}원` });
          break;
      }

      return transactionList;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 거래내역이 존재하지 않습니다.',
    });
  },

  makePaymentsTemplate: async (accountBookId, paymentResultsById) => {
    const paymentList = [...paymentResultsById];
    const transactionList = await TransactionModel.find({
      accountBookId: accountBookId,
      paymentMethod: { $in: [...paymentResultsById] },
    });

    for (let [index, payment] of paymentList.entries()) {
      let totalCost = 0;
      const filterResult = transactionList.filter(
        (item) => item.paymentMethod === payment
      );

      for (let transaction of filterResult) {
        totalCost += transaction.cost;
      }

      paymentList[index] = { payment, totalCost };
    }

    if (paymentList) {
      return paymentList;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 결제수단의 결제정보를 불러오는데 에러가 발생했습니다.',
    });
  },

  addPayment: async (accountBookId, paymentName) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId },
      { $push: { paymentMethod: [paymentName] } }
    );

    if (result.ok === 1) {
      return 'success';
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '카드 추가에 실패했습니다.',
    });
  },

  deletePayment: async (accountBookId, paymentName) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId },
      { $pull: { paymentMethod: paymentName } }
    );

    if (result.ok === 1) {
      return 'success';
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '카드 삭제에 실패했습니다.',
    });
  },

  updatePayment: async (accountBookId, selectedCardName, newCardName) => {
    const { paymentMethod } = await AccountBookModel.findOne({
      _id: accountBookId,
    });

    const cardIndex = paymentMethod.indexOf(selectedCardName);

    const result = await AccountBookModel.updateOne(
      { _id: accountBookId },
      { $set: { [`paymentMethod.${cardIndex}`]: newCardName } }
    );

    if (result.ok === 1) {
      return 'success';
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '카드 명 수정에 실패했습니다.',
    });
  },
};

module.exports = PaymentService;
