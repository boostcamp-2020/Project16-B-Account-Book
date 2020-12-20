import styled, { keyframes } from 'styled-components';
import GitHubSvg from '../../svgs/GitHubSvg';
import NaverSvg from '../../svgs/NaverSvg';
import KakaoSvg from '../../svgs/KakaoSvg';
import logoImg from '@public/img/colored_logo_img.png';

const GITHUB_AUTHORIZATION_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.HOMEPAGE_URL}`;
const NAVER_AUTHORIZATION_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.HOMEPAGE_URL}&state=naver`;
const KAKAO_AUTHORIZATION_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.HOMEPAGE_URL}&state=kakao`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  outline: none;
  background-color: white;
  width: 80%;
  padding: 3px;
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
  width: ${(props) => props.width || '40%'};
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  margin-top: 10%;
  width: 70%;
  height: 80%;
`;

const Title = styled.span`
  margin-top: 2rem;
  margin-bottom: 3rem;
  font-weight: bolder;
  font-size: 3vw;
`;

const SubTitle = styled.div`
  margin-bottom: 10px;
  font-size: 2vw;

  &:after {
    content: '';
    display: block;
    width: 43%;
    height: 2px;
    background-color: #fc5185;
    transform: translateY(0.1em);
  }
`;

const show = keyframes`
  0% { color: transparent; }
  100% { color: black; }
`;

const SubText = styled.span`
  font-size: 2vw;
  animation: ${show} 3.5s linear infinite;
`;

const Text = styled.span`
  font-size: 2vw;
`;

const LoginForm = () => {
  return (
    <>
      <OuterBox>
        {/* <GitHubSvg background={true} /> */}
        <Container>
          <StyledImage src={logoImg} />
        </Container>
        <MiddleBox>
          <Content>
            <Box width="33%">
              <SubTitle>
                <b>'돈 관리'</b>하세요.
              </SubTitle>
              <SubText>
                사람들과 <b>공유하고,</b> <br />
                거래 내역을 <b>등록하며</b> <br />
                당신의 지갑을 관리해 보세요.
              </SubText>
            </Box>
            <Box color="black">
              <Title>
                지금 당신의 지갑에서 무슨 일이 일어나고 있는지 알아보세요.
              </Title>
              <Text>오늘 당장 Piggy Book에 가입하세요.</Text>
              <StyledLink href={GITHUB_AUTHORIZATION_URL}>
                <LoginButton type="button">
                  <GitHubSvg /> Login with GitHub
                </LoginButton>
              </StyledLink>
              <StyledLink href={NAVER_AUTHORIZATION_URL}>
                <LoginButton type="button">
                  <NaverSvg /> Login with NAVER
                </LoginButton>
              </StyledLink>
              <StyledLink href={KAKAO_AUTHORIZATION_URL}>
                <LoginButton type="button">
                  <KakaoSvg /> Login with kakao
                </LoginButton>
              </StyledLink>
            </Box>
          </Content>
        </MiddleBox>
      </OuterBox>
    </>
  );
};

export default LoginForm;
