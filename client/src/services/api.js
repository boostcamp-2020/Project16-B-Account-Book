import axios from 'axios';

const API_URL = process.env.API_URL;

export async function fetchTest({ test }) {
  console.log(test);
  const url = `${API_URL}/user`;
  const { data } = await axios(url);
  return data;
}

export async function getPayment({ userId, accountBookId }) {
  const url = `${API_URL}/payment/${userId}`;

  const { data } = await axios({
    url: url,
    method: 'post',
    data: {
      accountBookId: accountBookId,
    },
  });

  return data;
}

export async function addPayment({ userId, paymentName }) {
  const url = `${API_URL}/payment/`;

  const { data } = await axios({
    url: url,
    method: 'put',
    data: {
      userId,
      paymentName,
    },
  });

  return data;
}

export async function deletePayment({ userId, paymentName }) {
  const url = `${API_URL}/payment/`;

  const { data } = await axios({
    url: url,
    method: 'delete',
    data: {
      userId,
      paymentName,
    },
  });

  return data;
}

export async function postLoginGithub(code) {
  const url = `${API_URL}/user/githublogin`;

  const { data } = await axios(url, {
    method: 'post',
    data: {
      code,
    },
  });

  return data;
}

export async function postLoginNaver(code) {
  const url = `${API_URL}/user/naverlogin`;

  const { data } = await axios(url, {
    method: 'post',
    data: {
      code,
    },
  });

  return data;
}
