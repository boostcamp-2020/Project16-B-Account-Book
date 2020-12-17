import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import Overlay from './Overlay';
import color from '@public/color';
import { useHistory } from 'react-router-dom';
import { reset } from '@slice';

const UserMenuDropDownWrapper = styled.div`
  top: 15px;
  right: 15px;
  position: absolute;
  width: 200px;
  font-size: 13px;
  text-align: center;
  background-color: white;
  color: ${color.fontLightBold};
  border: 1px solid ${color.line};
  box-shadow: ${color.boxShadow};
  z-index: 12;
  .dropdown-option {
    height: 40px;
    line-height: 40px;
    &:last-child {
      border-top: 1px solid ${color.line};
    }
  }
`;

const UserMenuDropDown = ({ setUserMenu }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    history.push('/');
    dispatch(reset());
    document.cookie =
      'accountBookId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  };

  const moveToSettingPage = () => {
    history.push('/setting');
  };

  return (
    <>
      <Overlay setModal={setUserMenu} />
      <UserMenuDropDownWrapper>
        <div className="dropdown-option" onClick={moveToSettingPage}>
          정보수정
        </div>
        <div className="dropdown-option">
          <span onClick={logout}>로그아웃</span>
        </div>
      </UserMenuDropDownWrapper>
    </>
  );
};

export default UserMenuDropDown;
