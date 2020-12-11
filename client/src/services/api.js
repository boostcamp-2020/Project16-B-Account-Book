import axios from 'axios';

import { axiosAPI } from '../../util/axios';
import { getCookie } from '../../util/cookie';

const API_URL = process.env.API_URL;

export async function fetchTest({ test }) {
  console.log(test);
  const url = `${API_URL}/user`;
  const { data } = await axios(url);
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

export async function getTags() {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(`accountBook/${accountBookId}`, 'GET');

  return data.tags;
}

export async function getTransactions() {
  const url = `${API_URL}/transaction`;

  const { data } = await axiosAPI(url, 'GET');

  return data;
}

export async function getTransactionsByAccountBookId() {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(`/transaction/${accountBookId}`, 'GET');

  return data;
}

export async function getCalendarTransactions(year, month) {
  const url = `${API_URL}/transaction/${year}/${month}`;
  const { data } = await axiosAPI(url, 'GET');

  return data;
}

export async function postTransaction({ transactions }) {
  const { data } = await axiosAPI(`${API_URL}/transaction`, 'POST', {
    transactions,
  });

  return data;
}

export async function updateTransaction({ transactionId, transaction }) {
  const { data } = await axiosAPI(`${API_URL}/transaction`, 'PATCH', {
    transactionId,
    ...transaction,
  });

  return data;
}

export async function deleteTransaction({ transactionIds }) {
  const { data } = await axiosAPI(`${API_URL}/transaction`, 'DELETE', {
    transactionIds,
  });

  return data;
}

export async function createTag({ tag }) {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI('/accountBook/tag', 'POST', {
    newTag: [tag],
    accountBookId,
  });

  return data;
}

export async function updateTag({ originalTag, newTag }) {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(`/accountBook/tag`, 'PATCH', {
    originalTag,
    newTag,
    accountBookId,
  });

  return data;
}

export async function deleteTag({ tag }) {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(
    `/accountBook/${accountBookId}/tag/${tag}`,
    'DELETE'
  );

  return data;
}

export async function getAccountBooks() {
  const { data } = await axiosAPI('/accountBook', 'GET');

  return data;
}

export async function getAccountBook() {
  const accountBookId = getCookie('accountBookId');
  const { data } = await axiosAPI(`/accountBook/${accountBookId}`, 'GET');

  return data;
}

export async function createAccountBook({ title }) {
  const { data } = await axiosAPI('/accountBook', 'POST', { title });

  return data;
}

export async function deleteAccountBook({ accountBookId }) {
  const { data } = await axiosAPI(`/accountBook/${accountBookId}`, 'DELETE');

  return data;
}

export async function updateAccountBook({ accountBookId, newTitle }) {
  const { data } = await axiosAPI('/accountBook', 'PATCH', {
    accountBookId,
    newTitle,
  });

  return data;
}
