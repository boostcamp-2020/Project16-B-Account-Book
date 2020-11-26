import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

import { SidebarList } from './SidebarList';

const backgroundColor = '#fff';
const borderColor = '#eeeeee';
const fontColor = '#222222';
const hoverColor = '#f5f5f5';

const NavContainer = styled.div`
  background-color: ${backgroundColor};
  height: 60px;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 1px solid ${borderColor};
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
    background-color: ${backgroundColor};
    border-right: 1px solid ${borderColor};
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
    background-color: ${hoverColor};
  }

  .nav-menu-items {
    width: 100%;
    padding-left: 0;
  }

  .navbar-toggle {
    background-color: ${backgroundColor};
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const Span = styled.span`
  color: ${fontColor};
  margin-left: 16px;
`;

const PiggyTitle = styled.span`
  color: ${fontColor};
  margin-left: 16px;
  margin-top: 6px;
`;

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: fontColor }}>
        <NavContainer>
          <MenuBars>
            <Link to="#">
              <FaIcons.FaBars size={20} onClick={showSidebar} />
            </Link>
          </MenuBars>
          <PiggyTitle className="piggy-book">
            <b>PIGGY BOOK 💸</b>
          </PiggyTitle>
        </NavContainer>
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
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
