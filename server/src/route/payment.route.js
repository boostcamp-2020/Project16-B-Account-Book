const Router = require('koa-router');
const router = new Router();

const paymentController = require('../controller/payment.controller');

router.get('/', paymentController.getPayments);
router.get('/:cardName', paymentController.getAllTransaction);

router.patch('/', paymentController.addPayment);
router.patch('/update', paymentController.updatePayment);

router.delete('/', paymentController.deletePayment);

module.exports = router;
