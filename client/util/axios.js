import axios from 'axios';
import { getToken } from './token';

const accountBookId = '5fc713abd120a78e5c18216d'; // TODO: Local Storage에서 get해 올 예정

export const axiosAPI = (url, method, body) => {
  return axios({
    url,
    method,
    baseURL: process.env.API_URL,
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    data: body,
  });
};

export const getOptions = (url) => {
  return {
    url,
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
      accountBookId,
    },
  };
};

export const patchOptions = (url, data) => {
  return {
    url,
    method: 'patch',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
      accountBookId,
    },
    data,
  };
};

export const deleteOptions = (url, data) => {
  return {
    url,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
      accountBookId,
    },
    data,
  };
};
