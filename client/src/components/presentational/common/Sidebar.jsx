import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as AiIcons from 'react-icons/ai';

import color from '@public/color';
import { SidebarList } from './SidebarList';

const NavMenu = styled.div`
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
    width: 85%;
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
    height: 30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const MenuBars = styled.div`
  display: flex;

  a {
    margin-right: 1rem;
    font-size: 2rem;
    background: none;
  }
`;

const Span = styled.span`
  color: ${color.fontBold};
  margin-left: 16px;
`;

export default function SideBar({ sidebar, showSidebar }) {
  return (
    <NavMenu>
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
    </NavMenu>
  );
}
