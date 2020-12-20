const Router = require('koa-router');

const userRouter = require('./user.route');
const paymentRouter = require('./payment.route');
const transactionRouter = require('./transaction.route');
const accountBookRouter = require('./accountBook.route');
const tokenValidator = require('../../middleware/tokenValidator');
const cookieParser = require('../../middleware/cookieParser');

const router = new Router();

router.use('/user', userRouter.routes());
router.use('/payment', tokenValidator, cookieParser, paymentRouter.routes());
router.use(
  '/transaction',
  tokenValidator,
  cookieParser,
  transactionRouter.routes()
);
router.use(
  '/accountBook',
  tokenValidator,
  cookieParser,
  accountBookRouter.routes()
);

module.exports = router;
