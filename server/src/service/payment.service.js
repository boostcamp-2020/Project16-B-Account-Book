const UserModel = require('../model/user.model');
const TransactionModel = require('../model/transaction.model');
const createError = require('../util/error');

const PaymentService = {
  getPayments: async (userId) => {
    const resultById = await UserModel.find({ _id: userId });

    if (resultById) {
      return resultById[0].paymentMethod;
    }

    //throw new Error('요청하신 사용자의 결제수단이 존재하지 않습니다.');
    const error = createError({
      status: 'BAD REQUEST',
      msg: '요청하신 사용자의 결제수단이 존재하지 않습니다.',
    });

    throw error;
  },

  makePaymentsTemplate: async (accountBookId, paymentsById) => {
    const paymentList = [...paymentsById];

    for (let [index, payment] of paymentList.entries()) {
      const transactionList = await TransactionModel.find({
        accountBookId: accountBookId,
        paymentMethod: payment,
      });

      let sum = 0;
      for (let transaction of transactionList) {
        sum += transaction.cost;
      }

      paymentList[index] = { payment: payment, totalCost: sum };
    }

    if (paymentList) {
      return paymentList;
    }

    throw new Error(
      '요청하신 결제수단의 결제정보를 불러오는데 에러가 발생했습니다.'
    );
  },
};

module.exports = PaymentService;
