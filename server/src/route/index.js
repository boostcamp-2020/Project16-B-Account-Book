const Router = require('koa-router');

const userRouter = require('./user.route');
const paymentRouter = require('./payment.route');
const transactionRouter = require('./transaction.route');
const categoryRouter = require('./category.route');
const accountBookRouter = require('./accountBook.route');
const tokenValidator = require('../../middleware/tokenValidator');


const router = new Router();

router.get('/', tokenValidator, (ctx) => {
  ctx.body = 'index 입니다';
});

router.use('/user', userRouter.routes());
router.use('/payment', paymentRouter.routes());
router.use('/transaction', transactionRouter.routes());
router.use('/category', categoryRouter.routes());
router.use('/accountBook', accountBookRouter.routes());

module.exports = router;
