import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, login } from '../../slice';
import { useEffect } from 'react';
import styled from 'styled-components';
import GitHubSvg from '../../svgs/GitHubSvg';
import queryString from 'query-string';
import NaverSvg from '../../svgs/NaverSvg';

const GITHUB_AUTHORIZATION_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.HOMEPAGE_URL}`;

const NAVER_AUTHORIZATION_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.HOMEPAGE_URL}&state=naver`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1da1f2;
  outline: none;
  background-color: white;
  width: 95%;
  border-radius: 20px;
  & > * {
    padding-right: 10px;
  }
  :hover {
    background-color: #fcf7f7;
    cursor: pointer;
  }
  :active {
    background-color: #ebebeb;
  }
`;

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

  return (
    <>
      <div>LoginFormContainer</div>
      {!token ? (
        <>
          <StyledLink href={GITHUB_AUTHORIZATION_URL}>
            <LoginButton type="button">
              <GitHubSvg /> Login With github
            </LoginButton>
          </StyledLink>
          <StyledLink href={NAVER_AUTHORIZATION_URL}>
            <LoginButton type="button">
              <NaverSvg /> Login With naver
            </LoginButton>
          </StyledLink>
        </>
      ) : (
        <>
          <span>hello</span>
        </>
      )}
    </>
  );
};

export default LoginFormContainer;
