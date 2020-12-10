const Router = require('koa-router');
const router = new Router();
const transactionController = require('../controller/transaction.controller');
const tokenValidator = require('../../middleware/tokenValidator');

router.get('/', transactionController.getAccountBookTransactions);
router.get('/:year/:month', transactionController.getCalendarTransactions);
router.post('/', tokenValidator, transactionController.addTransaction);
router.patch('/', transactionController.updateTransaction);
router.delete('/', transactionController.deleteTransaction);

module.exports = router;
