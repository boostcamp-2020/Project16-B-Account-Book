import axios from 'axios';
import {
  getOptions,
  postOptions,
  patchOptions,
  deleteOptions,
} from '../../util/axios';

const API_URL = process.env.API_URL;

export async function getPayments() {
  const url = `${API_URL}/payment/`;
  const { data } = await axios(getOptions(url));

  return data;
}

export async function getPaymentsDetail(cardName, type) {
  const url = `${API_URL}/payment/${cardName}/${type}`;
  const { data } = await axios(getOptions(url));

  return data;
}

export async function patchPayment({ paymentName }) {
  const url = `${API_URL}/payment/`;
  const body = { paymentName };

  const { data } = await axios(postOptions(url, body));

  return data;
}

export async function deletePayment({ paymentName }) {
  const url = `${API_URL}/payment/`;
  const body = { paymentName };

  const { data } = await axios(deleteOptions(url, body));

  return data;
}

export async function updatePayment({ selectedCardName, newCardName }) {
  const url = `${API_URL}/payment/`;
  const body = { selectedCardName, newCardName };

  const { data } = await axios(patchOptions(url, body));

  return data;
}
