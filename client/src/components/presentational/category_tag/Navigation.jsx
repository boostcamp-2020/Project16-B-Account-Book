import styled from 'styled-components';

import color from '@public/color';
import NavigationMarker from './NavigationMarker';

const NavigationWrapper = styled.div`
  width: 50%;
  margin-left: 10px;
  ul {
    padding-inline-start: 0px;
    li {
      display: inline;
      list-style-type: none;
      text-align: center;
      .nav-title {
        display: inline-block;
        width: 50%;
        pointer-events: none;
      }
    }
  }
  .normal {
    color: ${color.fontNormal};
  }
  .active {
    color: ${color.fontBold};
  }
  .normal,
  .active:hover {
    cursor: pointer;
  }
`;

const Navigation = ({ navMenu, setNavMenu }) => {
  const onNavClick = (e) => {
    const clicked = e.target.id;
    if (clicked !== navMenu) {
      setNavMenu(clicked);
    }
  };

  return (
    <>
      <NavigationWrapper>
        <ul>
          <li
            id="category"
            className={navMenu === 'category' ? 'active' : 'normal'}
            onClick={onNavClick}
          >
            <div className="nav-title">카테고리</div>
          </li>
          <li
            id="tag"
            className={navMenu === 'tag' ? 'active' : 'normal'}
            onClick={onNavClick}
          >
            <div className="nav-title">태그</div>
          </li>
          <NavigationMarker selected={navMenu} />
        </ul>
      </NavigationWrapper>
    </>
  );
};

export default Navigation;
