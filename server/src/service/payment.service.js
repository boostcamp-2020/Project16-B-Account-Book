const UserModel = require('../model/user.model');
const TransactionModel = require('../model/transaction.model');

const PaymentService = {
  getPayments: async (userId) => {
    const { paymentMethod } = await UserModel.findOne({ _id: userId });

    if (paymentMethod) {
      return paymentMethod;
    }

    throw new Error('요청하신 사용자의 결제수단이 존재하지 않습니다.');
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

    throw new Error(
      '요청하신 결제수단의 결제정보를 불러오는데 에러가 발생했습니다.'
    );
  },

  addPayment: async (userId, paymentName) => {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $push: { paymentMethod: [paymentName] } }
    );

    if (result.ok === 1) {
      return 'success';
    }

    throw new Error('카드 추가에 실패했습니다.');
  },

  deletePayment: async (userId, paymentName) => {
    const result = await UserModel.updateOne(
      { _id: userId },
      { $pull: { paymentMethod: paymentName } }
    );

    if (result.ok === 1) {
      return 'success';
    }

    throw new Error('카드 삭제에 실패했습니다.');
  },

  updatePayment: async (userId, selectedCardName, newCardName) => {
    const { paymentMethod } = await UserModel.findOne({
      _id: userId,
    });

    const cardIndex = paymentMethod.indexOf(selectedCardName);

    const result = await UserModel.updateOne(
      { _id: userId },
      { $set: { [`paymentMethod.${cardIndex}`]: newCardName } }
    );

    if (result.ok === 1) {
      return 'success';
    }

    throw new Error('카드 추가에 실패했습니다.');
  },
};

module.exports = PaymentService;
