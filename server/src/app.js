const Koa = require('koa');
const Router = require('koa-router');
const cors = require('cors');
const bodyParser = require('koa-bodyparser');

const indexRouter = require('./route/index');

require('dotenv').config();
require('./startup/db')();

const corsOptions = {
  origin: process.env.CLIENT_URL,
};

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

app.use(bodyParser());
app.use(cors(corsOptions));
router.use('', indexRouter.routes());
app.use(router.routes()).use(router.allowedMethods());

app.on('error', (err) => {
  console.log('server error', err);
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
