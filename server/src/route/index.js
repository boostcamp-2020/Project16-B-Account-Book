const Router = require('koa-router');

const userRouter = require('./user.route');
const paymentRouter = require('./payment.route');
const transactionRouter = require('./transaction.route');
const tokenValidator = require('../../middleware/tokenValidator');

const router = new Router();

router.get('/', tokenValidator, (ctx) => {
  ctx.body = 'index 입니다';
});

router.use('/user', userRouter.routes());
router.use('/payment', paymentRouter.routes());
router.use('/transaction', transactionRouter.routes());

module.exports = router;
