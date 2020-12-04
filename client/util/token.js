// TODO: accessToken 네이밍이 바뀌면 다시 수정 필요

export const setToken = (token) => {
  localStorage.setItem('accessToken', token);
};
export const getToken = () => localStorage.getItem('accessToken');

export const removeToken = () => localStorage.removeItem('accessToken');
