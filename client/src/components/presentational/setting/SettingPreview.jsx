import styled from 'styled-components';

const Preview = styled.section`
  flex-basis: 50%;
  background-color: #95e1d3;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 1em;
`;

const SettingPreview = () => {
  return (
    <Preview>
      <Title>내용</Title>
    </Preview>
  );
};

export default SettingPreview;
