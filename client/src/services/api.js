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
