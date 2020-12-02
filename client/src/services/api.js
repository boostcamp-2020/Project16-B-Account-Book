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
