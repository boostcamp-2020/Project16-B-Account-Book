const Router = require('koa-router');
const router = new Router();

const accountBookController = require('../controller/accountBook.controller');

router.get('/', accountBookController.getAllAccountBooks);
router.get('/:accountBookId', accountBookController.getAccountBook);
router.post('/', accountBookController.createAccountBook);
router.delete('/:accountBookId', accountBookController.deleteAccountBook);
router.patch('/:accountBookId', accountBookController.updateAccountBook);

module.exports = router;
