const axios = require('axios');

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;
const NAVER_TOKEN_API_URL = 'https://nid.naver.com/oauth2.0/token';
const NAVER_USERINFO_API_URL = 'https://openapi.naver.com/v1/nid/me';

module.exports = async (ctx, next) => {
  if (!ctx.request.body.code) {
    ctx.status = 400;
  }
  const { code } = ctx.request.body;
  const token = await requestToken(code);
  const { response } = await requestUserInfo(token);
  const { id, email, name } = response;

  ctx.request.userInfo = {
    name,
    email,
    provider: 'naver',
    providerId: id,
  };

  await next();
};

const requestToken = async (code) => {
  const { data } = await axios.get(
    `${NAVER_TOKEN_API_URL}?grant_type=authorization_code&client_id=${NAVER_CLIENT_ID}&client_secret=${NAVER_CLIENT_SECRET}&code=${code}&state=asds`
  );

  return data.access_token;
};

const requestUserInfo = async (token) => {
  const { data } = await axios.get(NAVER_USERINFO_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
