export const setCookie = (key, value) => {
  document.cookie = `${key}=${value};`;
};

export const getCookie = (name) => {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

  return value ? value[2] : null;
};
