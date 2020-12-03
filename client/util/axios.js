import axios from 'axios';
import { getToken } from './token';

const axiosAPI = (url, method, body) => {
  return axios({
    url,
    method,
    baseURL: process.env.API_URL,
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
    },
    data: body,
  });
};

export default axiosAPI;
