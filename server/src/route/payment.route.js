const Router = require('koa-router');
const router = new Router();

const paymentController = require('../controller/payment.controller');

router.get('/', paymentController.getPayments);
router.get('/:cardName/:type/:year/:month', paymentController.getTransactions);

router.post('/', paymentController.addPayment);
router.patch('/', paymentController.updatePayment);

router.delete('/', paymentController.deletePayment);

module.exports = router;
