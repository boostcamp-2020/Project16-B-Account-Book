import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, login, setUserInfo } from '../../slice';
import { useEffect } from 'react';
import queryString from 'query-string';
import LoginForm from '../presentational/LoginForm';
import { Redirect } from 'react-router-dom';

const LoginFormContainer = () => {
  const dispatch = useDispatch();

  const { code, state } = queryString.parse(window.location.search);

  const token = useSelector((state) => state.default.accessToken);

  const handleLogin = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      dispatch(setAccessToken(accessToken));
      dispatch(setUserInfo(JSON.parse(localStorage.getItem('userInfo'))));
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

  return <>{!token ? <LoginForm /> : <Redirect to="/account-book" />}</>;
};

export default LoginFormContainer;
