const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const indexRouter = require('./route/index');

require('dotenv').config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`),
});
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

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
}

module.exports = app;
