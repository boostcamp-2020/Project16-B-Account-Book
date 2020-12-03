import axios from 'axios';
import {
  axiosAPI,
  getOptions,
  patchOptions,
  deleteOptions,
} from '../../util/axios';
import { getToken } from '../../util/token';

const API_URL = process.env.API_URL;

export async function fetchTest({ test }) {
  console.log(test);
  const url = `${API_URL}/user`;
  const { data } = await axios(url);
  return data;
}

export async function getPayment() {
  const url = `${API_URL}/payment/`;
  const { data } = await axios(getOptions(url));

  return data;
}

export async function patchPayment({ paymentName }) {
  const url = `${API_URL}/payment/`;
  const body = { paymentName };

  const { data } = await axios(patchOptions(url, body));

  return data;
}

export async function deletePayment({ paymentName }) {
  const url = `${API_URL}/payment/`;
  const body = { paymentName };

  const { data } = await axios(deleteOptions(url, body));

  return data;
}

export async function updatePayment({ selectedCardName, newCardName }) {
  const url = `${API_URL}/payment/update`;
  const body = { selectedCardName, newCardName };

  const { data } = await axios(patchOptions(url, body));

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
