import styled from 'styled-components';

const Editor = styled.section`
  flex-basis: 50%;
  background-color: #eaffd0;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
`;

const SettingEditor = () => {
  return (
    <Editor>
      <Title>설정</Title>
    </Editor>
  );
};

export default SettingEditor;
