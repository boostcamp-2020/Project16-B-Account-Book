module.exports = async function (ctx, next) {
  const accountBookId = ctx.header?.cookie?.replace(/accountBookId=/, '');

  if (ctx.request.userInfo) {
    ctx.request.userInfo.accountBookId = accountBookId;
  }

  await next();
};
