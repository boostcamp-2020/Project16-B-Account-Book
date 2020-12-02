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
      //ctx.body = 'error';
      ctx.throw(err.code, err);
    }
  },

  addPayment: async (ctx) => {
    try {
      const { userId, paymentName } = ctx.request.body;

      await PaymentService.addPayment(userId, paymentName);
      ctx.body = 'success';
    } catch (err) {
      ctx.body = 'error';
    }
  },

  deletePayment: async (ctx) => {
    try {
      const { userId, paymentName } = ctx.request.body;

      await PaymentService.deletePayment(userId, paymentName);
      ctx.body = 'success';

      return;
    } catch (err) {
      ctx.body = 'error';
    }
  },

  updatePayment: async (ctx) => {
    try {
      const { userId, selectedCardName, newCardName } = ctx.request.body;

      await PaymentService.updatePayment(userId, selectedCardName, newCardName);
      ctx.body = 'success';
    } catch (err) {
      ctx.body = 'error';
    }
  },
};

module.exports = PaymentController;
