import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setUserInfo, reset } from '@slice';
import {
  loadUserInfo,
  loadAllUsersInfo,
  loadInviteUsers,
  setUserSettingsInfo,
  changeUserInfo,
  changeMembers,
} from '@settingSlice';

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

  const [isMaster, setIsMaster] = useState(false);
  const userInfo = useSelector((state) => state.setting.userSettingsInfo);
  const currentUserInfo = useSelector((state) => state.setting.currentUserInfo);
  const usersInfo = useSelector((state) => state.setting.allUsersInfo);
  const inviteUserList = useSelector((state) => state.setting.inviteUsers);

  const compareInfo = () => {
    setIsMaster(false);
    if (usersInfo[0] != null && userInfo['_id'] === usersInfo[0]['_id']) {
      setIsMaster(true);
    }
  };

  useEffect(() => {
    dispatch(loadUserInfo());
    dispatch(loadAllUsersInfo());
    dispatch(loadInviteUsers());
  }, []);

  useEffect(() => {
    compareInfo();
    dispatch(loadInviteUsers());
  }, [usersInfo]);

  const updateUserInfo = (info) => {
    dispatch(changeUserInfo(info));
    dispatch(setUserInfo(info));
  };

  const onChange = (info) => {
    dispatch(setUserSettingsInfo(info));
  };

  const onChangeUser = (newMembers, deleteMembers) => {
    if (deleteMembers.includes(userInfo['_id'])) {
      dispatch(changeMembers(newMembers, deleteMembers));
      dispatch(loadAllUsersInfo()).then(() => {
        history.push('/account-book');
      });
      return;
    }

    dispatch(changeMembers(newMembers, deleteMembers));
  };

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
        <SettingEditor
          userInfo={userInfo}
          usersInfo={usersInfo}
          currentUserInfo={currentUserInfo}
          updateUserInfo={updateUserInfo}
          onChange={onChange}
          isMaster={isMaster}
          onChangeUser={onChangeUser}
          inviteUserList={inviteUserList}
        />
        <SettingPreview usersInfo={usersInfo} />
      </SubContainer>
    </MainContainer>
  );
};

export default SettingContainer;
