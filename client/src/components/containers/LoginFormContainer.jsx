import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, login } from '../../slice';
import { useEffect } from 'react';
import queryString from 'query-string';
import LoginForm from '../presentational/LoginForm';

const LoginFormContainer = () => {
  const dispatch = useDispatch();

  const { code, state } = queryString.parse(window.location.search);

  const token = useSelector((state) => state.accessToken);

  const handleLogin = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      dispatch(setAccessToken(accessToken));
      return;
    }

    if (code && !accessToken) {
      dispatch(login({ code, state }));
      return;
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <>{!token ? <LoginForm /> : <span>hello</span>}</>;
};

export default LoginFormContainer;
