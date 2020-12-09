import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { loadUserInfo } from '@slice';

const MainContainer = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;

  img {
    margin-left: 10px;
    margin-right: 8px;
    border-radius: 50% !important;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

const SettingContainer = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(loadUserInfo());
  }, []);

  return (
    <MainContainer>
      <ItemContainer>
        <img src={userInfo.imageURL} />
        <div>
          <b>{userInfo.name}님,</b> 안녕하세요 👏
        </div>
      </ItemContainer>
    </MainContainer>
  );
};

export default SettingContainer;
