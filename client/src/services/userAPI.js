import { axiosAPI } from '../../util/axios';

const API_URL = process.env.API_URL;

export async function getUserInfo() {
  const url = `${API_URL}/user/info`;
  const { data } = await axiosAPI(url, 'GET');

  return data;
}

export async function getUsersByAccountBook() {
  const url = `${API_URL}/user/accountBook`;
  const { data } = await axiosAPI(url, 'GET');

  return data;
}

export async function updateUserInfo(userInfo) {
  const { data } = await axiosAPI(`${API_URL}/user`, 'POST', {
    userInfo,
  });

  return data;
}
