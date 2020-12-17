import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useSelector } from 'react-redux';

import color from '@public/color';
import logoImg from '@public/img/colored_logo_img.png';
import logoTitle from '@public/img/dark_logo_title.png';
import sampleUserImg from '@public/img/squirrel.jpeg';
import UserMenuDropDown from './UserMenuDropDown';
import SidebarModal from './SidebarModal';

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  height: 60px;
  border-bottom: 1px solid ${color.line};

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

  @media (max-width: 767px) {
    display: none;
  }
`;

const MenuBars = styled.div`
  display: none;
  margin-left: 2rem;
  font-size: 2rem;
  background: none;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const Header = () => {
  const userInfo = useSelector((state) => state.default.userInfo);
  const [sidebarModal, setSidebarModal] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const showSidebarModal = () => setSidebarModal(true);
  const hideSidebarModal = () => setSidebarModal(false);
  const onUserMenuClick = () => setUserMenu(!userMenu);

  return (
    <>
      <IconContext.Provider value={{ color: color.fontBold }}>
        <HeaderWrapper>
          <MenuBars>
            <FaBars size={20} onClick={showSidebarModal} />
          </MenuBars>
          <Logo>
            <Link to="/">
              <img className="logo-pig" src={logoImg} />
              <img className="logo-title" src={logoTitle} />
            </Link>
          </Logo>
          <UserMenu>
            <div className="user-img">
              <img src={userInfo?.imageURL || sampleUserImg} />
            </div>
            <div className="user-email">{userInfo?.name || 'piggy book'}</div>
            <div className="user-dropdown" onClick={onUserMenuClick}>
              <IoIosArrowDown size={20} />
            </div>
            {userMenu && <UserMenuDropDown setUserMenu={setUserMenu} />}
          </UserMenu>
        </HeaderWrapper>
      </IconContext.Provider>
      {sidebarModal && <SidebarModal hideModal={hideSidebarModal} />}
    </>
  );
};

export default Header;
