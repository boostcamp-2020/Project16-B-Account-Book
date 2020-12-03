const PaymentService = require('../service/payment.service');

const PaymentController = {
  getPayments: async (ctx) => {
    try {
      const { accountbookid: accountBookId } = ctx.request.header;

      const paymentResultsById = await PaymentService.getPayments(
        accountBookId
      );

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
      const { accountbookid: accountBookId } = ctx.request.header;
      const { paymentName } = ctx.request.body;

      const paymentList = await PaymentService.addPayment(
        accountBookId,
        paymentName
      );

      ctx.body = paymentList;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  deletePayment: async (ctx) => {
    try {
      const { accountbookid: accountBookId } = ctx.request.header;
      const { paymentName } = ctx.request.body;

      const paymentList = await PaymentService.deletePayment(
        accountBookId,
        paymentName
      );

      ctx.body = paymentList;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },

  updatePayment: async (ctx) => {
    try {
      const { accountbookid: accountBookId } = ctx.request.header;
      const { selectedCardName, newCardName } = ctx.request.body;

      const paymentList = await PaymentService.updatePayment(
        accountBookId,
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
