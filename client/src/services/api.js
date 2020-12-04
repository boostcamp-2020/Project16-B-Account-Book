import axios from 'axios';
import axiosAPI from '../../util/axios';

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

export async function patchPayment({ userId, paymentName }) {
  const url = `${API_URL}/payment/`;

  const { data } = await axios({
    url: url,
    method: 'patch',
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

export async function updatePayment({ userId, selectedCardName, newCardName }) {
  const url = `${API_URL}/payment/update`;

  const { data } = await axios({
    url: url,
    method: 'patch',
    data: {
      userId,
      selectedCardName,
      newCardName,
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

export async function getTags({ accountBookId }) {
  const { data } = await axiosAPI(`/accountBook/${accountBookId}`, 'GET');

  return data.tags;
}

export async function getTransactions() {
  const url = `${API_URL}/transaction`;

  const { data } = await axiosAPI(url, 'GET');

  return data;
}

export async function postTransaction({ transaction }) {
  const url = `${API_URL}/transaction`;

  const { data } = await axios(url, {
    method: 'post',
    data: {
      ...transaction,
    },
  });

  return data;
}

export async function updateTransaction({ transactionId, transaction }) {
  const url = `${API_URL}/transaction`;

  const { data } = await axios(url, {
    method: 'patch',
    data: {
      transactionId,
      ...transaction,
    },
  });

  return data;
}

export async function deleteTransaction({ transactionId }) {
  const url = `${API_URL}/transaction?id=${transactionId}`;

  const { data } = await axios(url, {
    method: 'delete',
  });

  return data;
}
