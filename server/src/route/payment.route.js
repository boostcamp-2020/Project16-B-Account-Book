const Router = require('koa-router');
const router = new Router();

const paymentController = require('../controller/payment.controller');

router.post('/:userId', paymentController.getPayments);

router.put('/', paymentController.addPayment);

router.delete('/', paymentController.deletePayment);

module.exports = router;
