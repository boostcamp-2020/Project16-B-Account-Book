import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import svg from '@public/svg';
import color from '@public/color';
import logoImg from '@public/img/colored_logo_img.png';
import logoTitle from '@public/img/dark_logo_title.png';
import sampleUserImg from '@public/img/squirrel.jpeg';
import { SidebarList } from './SidebarList';
import UserMenuDropDown from './UserMenuDropDown';

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

const MavMenu = styled.div`
  .nav-menu {
    z-index: 10;
    background-color: ${color.backgroundColor};
    border-right: 1px solid ${color.line};
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0 8px 16px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: #f5f5f5;
    font-size: 15px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: ${color.hoverColor};
  }

  .nav-menu-items {
    width: 100%;
    padding-left: 0;
  }

  .navbar-toggle {
    background-color: ${color.backgroundColor};
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const Span = styled.span`
  color: ${color.fontBold};
  margin-left: 16px;
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
              <img className="logo-pig" src={logoImg} />
              <img className="logo-title" src={logoTitle} />
            </Link>
          </Logo>
          <UserMenu>
            <div className="user-img">
              <img src={sampleUserImg} />
            </div>
            <div className="user-email">jotace422@gmail.com</div>
            <div className="user-dropdown" onClick={onUserMenuClick}>
              {svg.arrowDown}
            </div>
            {userMenu && <UserMenuDropDown setUserMenu={setUserMenu} />}
          </UserMenu>

          <MavMenu>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
              <ul className="nav-menu-items" onClick={showSidebar}>
                <li className="navbar-toggle">
                  <MenuBars>
                    <Link to="#">
                      <AiIcons.AiOutlineClose size={20} />
                    </Link>
                  </MenuBars>
                </li>

                {SidebarList.map((item, index) => {
                  return (
                    <li key={'sidebar' + index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <Span>{item.title}</Span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </MavMenu>
        </HeaderWrapper>
      </IconContext.Provider>
    </>
  );
};

export default Header;
