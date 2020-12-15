import { v4 as uuid } from 'uuid';

import styled from 'styled-components';
import color from '@public/color';

const CheckboxesWrapper = styled.div`
  border: 1.5px solid ${color.line};
  background-color: white;
  width: fit-content;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
  min-width: 80px;
`;

const Title = styled.div`
  color: #353535;
  font-size: 1rem;
  font-weight: bold;
  background-color: #fdfdfe;
  width: fit-content;
  position: absolute;
  top: -12px;
  left: 14px;
  padding: 0 0.3rem;
`;

const Checkboxes = ({ checkboxes, setCheckbox, title }) => {
  const renderedItemsLit = () => {
    const items = Object.entries(checkboxes);
    if (!items.length) return;
    return items.map((item) => {
      const onChangeHandler = () => {
        setCheckbox({ ...checkboxes, [item[0]]: !item[1] });
      };

      return (
        <label key={uuid()}>
          <input type="checkbox" checked={item[1]} onChange={onChangeHandler} />
          {item[0]}
        </label>
      );
    });
  };

  return (
    <>
      <CheckboxesWrapper>
        <Title>{title}</Title>
        {renderedItemsLit()}
      </CheckboxesWrapper>
    </>
  );
};

export default Checkboxes;
