import axios from 'axios';

import { getToken } from './token';
import { getCookie } from './cookie';

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
    data: {
      ...body,
      accountBookId: getCookie('accountBookId'),
    },
  });
};

export const getOptions = (url) => {
  return {
    url,
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
      accountBookId: getCookie('accountBookId'),
    },
  };
};

export const postOptions = (url, data) => {
  return {
    url,
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
      accountBookId: getCookie('accountBookId'),
    },
    data,
  };
};

export const patchOptions = (url, data) => {
  return {
    url,
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
      accountBookId: getCookie('accountBookId'),
    },
    data,
  };
};

export const deleteOptions = (url, data) => {
  return {
    url,
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
      userid: '5fc67adeecfd3cb85cc7fb4d', // TODO: 추후 삭제
      accountBookId: getCookie('accountBookId'),
    },
    data,
  };
};
