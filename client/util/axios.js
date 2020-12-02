import axios from 'axios';
import { getToken } from './token';

axios.defaults.baseURL = process.env.API_URL;

const axiosAPI = (url, method, body) => {
  return axios({
    url,
    method,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getToken(),
      userid: '5fc67adeecfd3cb85cc7fb4d',
    },
    data: JSON.stringify(body),
  });
};

export default axiosAPI;
