const Koa = require('koa');

require('dotenv').config();

const app = new Koa();
const port = process.env.PORT || 3000;

app.use((ctx) => {
  ctx.body = '백엔드 환경설정';
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
