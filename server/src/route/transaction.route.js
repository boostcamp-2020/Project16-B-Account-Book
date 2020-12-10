const Router = require('koa-router');
const router = new Router();
const transactionController = require('../controller/transaction.controller');
const tokenValidator = require('../../middleware/tokenValidator');

router.get('/:accountBookId', transactionController.getTransactions);
router.get(
  '/',
  tokenValidator,
  transactionController.getAccountBookTransactions
);
router.get('/:year/:month', transactionController.getCalendarTransactions);
router.post('/', tokenValidator, transactionController.addTransaction);
router.patch('/', tokenValidator, transactionController.updateTransaction);
router.delete('/', tokenValidator, transactionController.deleteTransaction);

module.exports = router;
