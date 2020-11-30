const Router = require('koa-router');
const userRouter = require('./user.route');
const paymentRouter = require('./payment.route');

const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'index 입니다';
});
router.use('/user', userRouter.routes());
router.use('/payment', paymentRouter.routes());

module.exports = router;
