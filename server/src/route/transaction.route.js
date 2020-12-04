const Router = require('koa-router');
const router = new Router();
const transactionController = require('../controller/transaction.controller');

router.get('/', transactionController.getUserTransactions);
router.post('/', transactionController.addTransaction);
router.patch('/', transactionController.updateTransaction);
router.delete('/', transactionController.deleteTransaction);

module.exports = router;
