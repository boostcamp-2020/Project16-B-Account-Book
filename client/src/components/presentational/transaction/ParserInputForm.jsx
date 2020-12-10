import { useRef } from 'react';
import styled from 'styled-components';
import smsParser from '@util/smsParser';

const TextArea = styled.textarea`
  width: 100%;
  min-height: 10vh;
  margin: 5% 0px;
  resize: vertical;
`;

const ParserInputForm = ({ setParserStatus, setEditIdStatus }) => {
  const textAreaInput = useRef();

  const parseOnClick = () => {
    if (textAreaInput.current.value) {
      const parsedData = smsParser(textAreaInput.current.value);
      const data = dateParser(parsedData);
      setEditIdStatus(data);
    }
    setParserStatus(false);
  };

  const dateParser = (data) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const [month, day] = data?.date.split('/');
    if (data.isDeposit) {
      return { ...data, year, month, day, type: '수입' };
    }
    return { ...data, year, month, day, type: '지출' };
  };

  return (
    <>
      <div>sms/mms 파싱을 원하는 텍스트를 붙여 넣어 주세요!</div>
      <TextArea type="textArea" ref={textAreaInput}></TextArea>
      <button onClick={parseOnClick}>변환</button>
    </>
  );
};

export default ParserInputForm;
