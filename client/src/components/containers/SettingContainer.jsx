import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { loadUserInfo, reset } from '@slice';
import SettingHeader from '@presentational/setting/SettingHeader';
import SettingEditor from '../presentational/setting/SettingEditor';
import SettingPreview from '../presentational/setting/SettingPreview';

const MainContainer = styled.section`
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex: 1;

  @media screen and (max-width: 62rem) {
    flex-direction: column;
  }
`;

const SettingContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.UserSettingsInfo);

  useEffect(() => {
    dispatch(loadUserInfo());
  }, []);

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    history.push('/');
    dispatch(reset());
    document.cookie =
      'accountBookId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT';
  };

  return (
    <MainContainer>
      <SettingHeader userInfo={userInfo} onLogout={onLogout} />
      <SubContainer>
        <SettingEditor />
        <SettingPreview />
      </SubContainer>
    </MainContainer>
  );
};

export default SettingContainer;
