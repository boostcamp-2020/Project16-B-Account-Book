import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import color from '@public/color';
import { SidebarList } from './SidebarList';

const NavMenu = styled.div`
  .nav-menu {
    background-color: ${color.backgroundColor};
    border-right: 1px solid ${color.line};
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 61px;
    transition: 850ms;

    @media (max-width: 767px) {
      transform: translate(-251px, 0px);
    }
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0 8px 16px;
    list-style: none;
    height: 35px;
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

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: color.fontBold }}>
        <NavMenu>
          <div className="nav-menu active">
            <ul className="nav-menu-items" onClick={showSidebar}>
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
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
