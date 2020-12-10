import axios from 'axios';
import {
  getOptions,
  postOptions,
  patchOptions,
  deleteOptions,
} from '../../util/axios';

const API_URL = process.env.API_URL;

export async function getUserInfo() {
  const url = `${API_URL}/user/info`;
  const { data } = await axios(getOptions(url));

  return data;
}
