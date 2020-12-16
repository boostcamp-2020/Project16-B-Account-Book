const axios = require('axios');
const qs = require('querystring');

const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
const KAKAO_REDIRECT_URI = process.env.KAKAO_CALLBACK_URL;
const KAKAO_TOKEN_API_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USERINFO_URI = 'https://kapi.kakao.com/v2/user/me';

module.exports = async (ctx, next) => {
  if (!ctx.request.body.code) {
    ctx.status = 400;
  }
  const { code } = ctx.request.body;
  const token = await requestToken(code);
  const { id, name, email, imageURL } = await requestUserInfo(token);

  ctx.request.userInfo = {
    name,
    email,
    provider: 'kakao',
    providerId: id,
    imageURL,
  };

  await next();
};

const requestToken = async (code) => {
  const tokenResponse = await axios({
    method: 'POST',
    url: KAKAO_TOKEN_API_URL,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      grant_type: 'authorization_code',
      client_id: KAKAO_CLIENT_ID,
      redirect_uri: KAKAO_REDIRECT_URI,
      code,
    }),
  });

  const { access_token } = tokenResponse.data;
  return access_token;
};

const requestUserInfo = async (token) => {
  const { data } = await axios({
    method: 'GET',
    url: KAKAO_USERINFO_URI,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { id } = data;
  const { email } = data.kakao_account;
  const { nickname, profile_image_url } = data.kakao_account.profile;

  return {
    id: id,
    name: nickname,
    email,
    imageURL: profile_image_url,
  };
};
