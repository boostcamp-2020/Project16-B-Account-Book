const Router = require('koa-router');
const router = new Router();
const transactionController = require('../controller/transaction.controller');

router.get('/:accountBookId', transactionController.getTransactions);
router.get('/', transactionController.getAccountBookTransactions);
router.get('/:year/:month', transactionController.getCalendarTransactions);
router.post('/', transactionController.addTransaction);
router.patch('/', transactionController.updateTransaction);
router.patch('/tag', transactionController.updateTransactionTag);
router.delete('/', transactionController.deleteTransaction);
router.delete('/:tag', transactionController.deleteTransactionTag);

module.exports = router;
