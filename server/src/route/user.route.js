const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx) => {
  ctx.body = 'user 입니다';
});

module.exports = router;
