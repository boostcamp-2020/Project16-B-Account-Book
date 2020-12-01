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
        return;
      }
    } catch (err) {
      ctx.body = 'error';
    }
  },
};

module.exports = PaymentController;
