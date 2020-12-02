const axios = require('axios');

const GITHUB_TOKEN_API_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USERINFO_API_URL = 'https://api.github.com/user';

module.exports = async (ctx, next) => {
  if (!ctx.request.body.code) {
    ctx.status = 400;
  }
  const { code } = ctx.request.body;

  const token = await requestToken(code);
  const { login, id, avatar_url, email } = await requestUserInfo(token);

  ctx.request.userInfo = {
    name: login,
    email,
    provider: 'github',
    providerId: id,
    imageURL: avatar_url,
  };

  next();
};

const requestToken = async (code) => {
  const info = {
    code,
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
  };
  const { data } = await axios.post(GITHUB_TOKEN_API_URL, info, {
    headers: { accept: 'application/json' },
  });
  return data.access_token;
};

const requestUserInfo = async (token) => {
  const { data } = await axios.get(GITHUB_USERINFO_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
