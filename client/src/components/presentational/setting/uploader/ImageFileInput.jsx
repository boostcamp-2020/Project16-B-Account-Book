import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import ImageUploader from '@service/imageUploader';

const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: ${(props) => props.color || '#e7e7e7'};
  cursor: pointer;
  padding: 0.7em;
  flex: 1 1 100%;
  font-size: 1.05rem;
  outline: none;
  border-left: none;
  border-bottom: none;

  &:hover {
    opacity: 0.8;
  }
`;

const imageUploader = new ImageUploader();

const ImageFileInput = ({ imageURL, onChangeFileInfo }) => {
  const inputRef = useRef();
  const [imageName, setImageName] = useState('파일 선택');
  const [format, setFormat] = useState();

  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  // TODO: 프로필 이미지 되돌리기는 추후 구현 예정
  // const onCancelClick = (event) => {
  //   event.preventDefault();

  //   setImageName('파일 선택');
  //   setUploadURL(imageURL);
  //   onChangeFileInfo(imageURL);
  //   setFormat();
  // };

  const onChange = async (event) => {
    const uploaded = await imageUploader.upload(event.target.files[0]);

    setImageName(uploaded.original_filename);
    onChangeFileInfo(uploaded.url);
    setFormat(uploaded.format);
  };

  return (
    <UploadContainer>
      <UploadInput
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <UploadButton onClick={onButtonClick} color="white">
        {imageName}
        {format !== undefined ? `.${format}` : <></>}
      </UploadButton>
    </UploadContainer>
  );
};

export default ImageFileInput;
