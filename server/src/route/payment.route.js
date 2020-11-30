const Router = require('koa-router');
const router = new Router();

const paymentController = require('../controller/payment.controller');

router.get('/:userId', paymentController.getPayments);

module.exports = router;
