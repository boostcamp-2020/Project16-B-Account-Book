const Router = require('koa-router');
const router = new Router();
const transactionController = require('../controller/transaction.controller');

router.get('/', transactionController.fetchTransaction);

module.exports = router;
