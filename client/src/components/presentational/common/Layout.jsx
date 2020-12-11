import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import color from '@public/color';

const ContentWrapper = styled.div`
  position: absolute;
  top: 61px;
  left: 251px;
  padding: 50px 20px;
  width: 972px;
  height: 100%;
  background-color: ${color.pageBackground};
  transition: 850ms;

  @media (max-width: 767px) {
    transform: translate(-231px, 0px);
    width: 90%;
  }
`;

const Layout = ({ children: content }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <ContentWrapper>{content}</ContentWrapper>
      <div className="layout-body"></div>
    </>
  );
};

export default Layout;
