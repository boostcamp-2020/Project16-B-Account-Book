const JWT = 'JWT';

export const setToken = (token) => {
  localStorage.setItem(JWT, `Bearer ${token}`);
};
export const getToken = () => localStorage.getItem(JWT);

export const removeToken = () => localStorage.removeItem(JWT);
