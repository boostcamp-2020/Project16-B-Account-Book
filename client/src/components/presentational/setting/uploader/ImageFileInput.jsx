import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import ImageUploader from '@service/imageUploader';

const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid gray;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadButton = styled.button`
  background-color: ${(props) => props.color || '#e7e7e7'};
  color: ${(props) => props.fontColor || 'black'};
  cursor: pointer;
  padding: 0.6em;
  flex: 1 1 ${(props) => props.size || '80%'};
  font-size: 1.05rem;
  border: none;
  outline: none;
  border-top: 1px ${(props) => props.line || 'solid'} gray;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingDiv = styled.div`
  width: 1.5em;
  height: 1.5em;
  margin: 10px;
  border-radius: 50%;
  border: 3px solid lightgray;
  border-top: 3px solid #65ced4;
  animation: ${spin} 2s linear infinite;
`;

const imageUploader = new ImageUploader();

const ImageFileInput = ({ originUserInfo, onChangeFileInfo }) => {
  const inputRef = useRef();
  const [format, setFormat] = useState();
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState('파일 선택');

  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onCancelClick = (event) => {
    event.preventDefault();

    setImageName('파일 선택');
    onChangeFileInfo(originUserInfo.imageURL);
    setFormat();
  };

  const onChange = async (event) => {
    setLoading(true);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    setLoading(false);

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

      {!loading && (
        <>
          <UploadButton
            onClick={onButtonClick}
            color="#fafbfc"
            fontColor="#586069"
            line="dotted"
          >
            {imageName}
            {format !== undefined ? `.${format}` : <></>}
          </UploadButton>
          <UploadButton
            onClick={onCancelClick}
            size="20%"
            color="#586069"
            fontColor="white"
          >
            취소
          </UploadButton>
        </>
      )}

      {loading && <LoadingDiv />}
    </UploadContainer>
  );
};

export default ImageFileInput;
