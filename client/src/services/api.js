import axios from 'axios';

const API_URL = process.env.API_URL;

export async function fetchTest({ test }) {
  console.log(test);
  const url = `${API_URL}/user`;
  const { data } = await axios(url);
  return data;
}
