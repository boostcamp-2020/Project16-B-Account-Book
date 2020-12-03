const PaymentService = require('../service/payment.service');

const PaymentController = {
  getPayments: async (ctx) => {
    try {
      const { userId } = ctx.request.params;
      const { accountBookId } = ctx.request.body;

      const paymentResultsById = await PaymentService.getPayments(userId);
      const paymentsList = await PaymentService.makePaymentsTemplate(
        accountBookId,
        paymentResultsById
      );

      if (paymentsList) {
        ctx.body = paymentsList;
      }
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  addPayment: async (ctx) => {
    try {
      const { userId, paymentName } = ctx.request.body;

      const paymentList = await PaymentService.addPayment(userId, paymentName);

      ctx.body = paymentList;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  deletePayment: async (ctx) => {
    try {
      const { userId, paymentName } = ctx.request.body;

      const paymentList = await PaymentService.deletePayment(
        userId,
        paymentName
      );

      ctx.body = paymentList;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  updatePayment: async (ctx) => {
    try {
      const { userId, selectedCardName, newCardName } = ctx.request.body;

      const paymentList = await PaymentService.updatePayment(
        userId,
        selectedCardName,
        newCardName
      );

      ctx.body = paymentList;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
};

module.exports = PaymentController;
