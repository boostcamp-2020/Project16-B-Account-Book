import axios from 'axios';
import { getToken } from './token';

const axiosAPI = (url, method, body) => {
  return axios({
    url,
    method,
    baseURL: process.env.API_URL,
    mode: 'cors',
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fbe261bf9266857e4dd7c3f', // TODO: 추후 삭제
      //userid: '5fc67adeecfd3cb85cc7fb4d' // TODO: 추후 삭제
    },
    data: body,
  });
};

export default axiosAPI;
