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
      ctx.body = 'error';
    }
  },

  addPayment: async (ctx) => {
    try {
      const { userId, paymentName } = ctx.request.body;

      await PaymentService.updatePayment(userId, paymentName);
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
};

module.exports = PaymentController;
