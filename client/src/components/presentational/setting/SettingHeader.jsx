import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const HeaderContainer = styled.header`
  width: 100%;
  padding: 0.7em;
  text-align: center;
  position: relative;
  background-color: #95e1d3;
`;

const Logout = styled.div`
  position: absolute;
  right: 3em;
  top: 1em;
`;

const ItemContainer = styled.div`
  font-size: 1.3rem;
  margin-top: 15px;
  margin-bottom: 15px;

  img {
    margin-left: 10px;
    margin-right: 8px;
    margin-bottom: 5px;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

const SettingHeader = ({ userInfo, onLogout }) => {
  return (
    <HeaderContainer>
      <Logout>
        <Button variant="outlined" onClick={onLogout}>
          로그아웃
        </Button>
      </Logout>
      <ItemContainer>
        <img src={userInfo.imageURL} />
        <div>
          <b>{userInfo.name}님,</b> 안녕하세요 👏
        </div>
      </ItemContainer>
    </HeaderContainer>
  );
};

export default SettingHeader;
