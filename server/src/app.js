const Koa = require('koa');
const Router = require('koa-router');
const indexRouter = require('./route/index');

require('dotenv').config();
require('./startup/db')();

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

router.use('', indexRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
