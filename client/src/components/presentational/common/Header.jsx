import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';

import svg from '@public/svg';
import color from '@public/color';
import UserMenuDropDown from './UserMenuDropDown';
import SideBar from './Sidebar';

const HeaderWrapper = styled.div`
  display: flex;
  height: 60px;
  border-bottom: 1px solid ${color.line};
  align-items: center;

  .logo-pig {
    width: 35px;
  }
  .logo-title {
    width: 160px;
  }
`;

const Logo = styled.div`
  flex-basis: 80%;
  padding-left: 20px;
`;

const UserMenu = styled.div`
  flex-basis: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  border-left: 1px solid ${color.line};
  padding: 0 5px;

  .user-img img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .user-email {
    padding-bottom: 7px;
    color: ${color.fontLightBold};
  }
  .user-dropdown {
    &:hover {
      cursor: pointer;
    }
  }
`;

const MenuBars = styled.div`
  display: flex;

  a {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }
`;

const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const onUserMenuClick = () => {
    setUserMenu(!userMenu);
  };

  return (
    <>
      <IconContext.Provider value={{ color: color.fontBold }}>
        <HeaderWrapper>
          <MenuBars>
            <Link to="#">
              <FaIcons.FaBars size={20} onClick={showSidebar} />
            </Link>
          </MenuBars>
          <Logo>
            <Link to="/">
              <img
                className="logo-pig"
                src="../../../../public/img/dark_logo_only_transparent_background.png"
              />
              <img
                className="logo-title"
                src="../../../../public/img/dark_title_transparent_background.png"
              />
            </Link>
          </Logo>
          <UserMenu>
            <div className="user-img">
              <img src="../../../../public/img/squirrel.jpeg" />
            </div>
            <div className="user-email">jotace422@gmail.com</div>
            <div className="user-dropdown" onClick={onUserMenuClick}>
              {svg.arrowDown}
            </div>
            {userMenu && <UserMenuDropDown setUserMenu={setUserMenu} />}
          </UserMenu>

          <SideBar sidebar={sidebar} showSidebar={showSidebar} />
        </HeaderWrapper>
      </IconContext.Provider>
    </>
  );
};

export default Header;
