const Router = require('koa-router');
const router = new Router();

const paymentController = require('../controller/payment.controller');

router.post('/:userId', paymentController.getPayments);

router.put('/', paymentController.addPayment);

module.exports = router;
