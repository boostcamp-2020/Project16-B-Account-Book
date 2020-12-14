import styled from 'styled-components';
import React, { useRef } from 'react';

import Button from '../button/Button';
import ImageFileInput from '../uploader/ImageFileInput';

const CardFormContainer = styled.form`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border-top: 1px solid black;
  border-left: 1px solid black;
  margin-bottom: 5em;
`;

const Info = styled.div`
  width: 100%;
  border: 0;
  padding: 1.2em;
  border-right: 1px solid black;
  background: white;
  flex: 1 1 40%;
  font-size: 1rem;

  &:focus {
    outline: 0;
  }
`;

const Select = styled.select`
  width: 100%;
  border: 0;
  padding: 1.2em;
  border-top: 1px solid black;
  border-right: 1px solid black;

  background: white;
  font-size: 1rem;
  cursor: pointer;
`;

const CardEditForm = ({ userInfo, updateUserInfo, onChange }) => {
  const { email, imageURL, name, startDateOfMonth, startDayOfWeek } = userInfo;

  const monthRef = useRef();
  const weekRef = useRef();

  const onChangeInfo = (event) => {
    event.preventDefault();

    onChange({
      ...userInfo,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const onChangeFileInfo = (url) => {
    onChange({
      ...userInfo,
      imageURL: url,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateUserInfo(userInfo);
  };

  return (
    <CardFormContainer>
      <Info name="name">{name}</Info>
      <Info name="email">{email}</Info>
      <Select
        ref={monthRef}
        onChange={onChangeInfo}
        name="startDateOfMonth"
        value={startDateOfMonth}
      >
        <option disabled value={startDateOfMonth}>
          달력 시작 일: {startDateOfMonth}일
        </option>
        <option value="1">달력 시작 일: 1일</option>
        <option value="10">달력 시작 일: 10일</option>
        <option value="15">달력 시작 일: 15일</option>
        <option value="25">달력 시작 일: 25일</option>
      </Select>
      <Select
        ref={weekRef}
        onChange={onChangeInfo}
        name="startDayOfWeek"
        value={startDayOfWeek}
      >
        <option disabled value={startDayOfWeek}>
          달력 시작 요일: {startDayOfWeek}day
        </option>
        <option value="Sun">달력 시작 요일: Sunday</option>
        <option value="Mon">달력 시작 요일: Monday</option>
      </Select>

      <ImageFileInput imageURL={imageURL} onChangeFileInfo={onChangeFileInfo} />
      <Button name="정보 수정" onClick={onSubmit} />
    </CardFormContainer>
  );
};

export default CardEditForm;
