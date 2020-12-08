import { useDispatch, useSelector } from 'react-redux';

import { setAccessToken, login } from '../../slice';
import { useEffect } from 'react';
import styled from 'styled-components';
import GitHubSvg from '../../svgs/GitHubSvg';
import queryString from 'query-string';
import NaverSvg from '../../svgs/NaverSvg';
import logoImg from '@public/img/colored_logo_img.png';

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

const OuterBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Box = styled.div`
  width: 33%;
  font-size: 1.5rem;

  display: flex;
  flex-direction: column;
  padding-right: 5px;
  color: ${(props) => props.color || 'black'};

  & > * {
    margin-top: 5px;
    margin-bottom: 5px;
    & > * {
      margin-right: 10px;
    }
  }
`;

const MiddleBox = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
`;

const StyledImage = styled.img`
  width: 100vw;
  height: 100vh;
`;

const Title = styled.span`
  margin-bottom: 3rem;
  font-weight: bolder;
  font-size: 3vw;
`;

const Text = styled.span`
  font-size: 2vw;
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
      {!token ? (
        <>
          <OuterBox>
            {/* <GitHubSvg background={true} /> */}
            <StyledImage src={logoImg} />
            <MiddleBox>
              <Content>
                <Box>
                  <Text> 돈 관리 하세요.</Text>
                  <Text>
                    사람들과 거래 내역을 등록 해서 당신의 지갑을 관리 해보세요.
                  </Text>
                </Box>
                <Box color="black">
                  <GitHubSvg />
                  <Title>
                    지금 당신의 지갑에서 무슨 일이 일어나고 있는지 알아보세요.
                  </Title>
                  <Text>오늘 당장 Piggy Book에 가입하세요.</Text>
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
                </Box>
              </Content>
            </MiddleBox>
          </OuterBox>
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
