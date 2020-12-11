const Router = require('koa-router');
const router = new Router();

const accountBookController = require('../controller/accountBook.controller');

router.get('/', accountBookController.getAllAccountBooks);
router.get('/:accountBookId', accountBookController.getAccountBook);
router.post('/', accountBookController.createAccountBook);
router.delete('/:accountBookId', accountBookController.deleteAccountBook);
router.patch('/', accountBookController.updateAccountBook);
router.post('/users', accountBookController.addAccountBookUsers);
router.post('/tag', accountBookController.addAccountBookTag);
router.patch('/tag', accountBookController.updateAccountBookTag);
router.delete(
  '/:accountBookId/tag/:tagName',
  accountBookController.deleteAccountBookTag
);

module.exports = router;
