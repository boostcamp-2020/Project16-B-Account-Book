import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import color from '@public/color';

const LayoutWrapper = styled.div``;

const ContentWrapper = styled.div`
  position: absolute;
  top: 61px;
  left: 251px;
  padding: 50px 20px;
  max-width: 972px;
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
      <LayoutWrapper>
        <Header />
        <Sidebar />
        <ContentWrapper>{content}</ContentWrapper>
        <div className="layout-body"></div>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
