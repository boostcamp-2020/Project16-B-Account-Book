import React from 'react';
import styled from 'styled-components';

import Overlay from './Overlay';
import color from '@public/color';

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
  
  return (
    <>
      <Overlay setModal={setUserMenu} />
      <UserMenuDropDownWrapper>
        <div className="dropdown-option">
          정보수정
        </div>
        <div className="dropdown-option">
          로그아웃
        </div>
      </UserMenuDropDownWrapper>
    </>
  );
};

export default UserMenuDropDown;
