import { Fragment, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TransactionInputForm = ({
  insertTransaction,
  updateTransactionHandler,
  editIdStatus,
  handleCancel,
  paymentMethods = [],
  tags = [],
}) => {
  const categoryInput = useRef();
  const paymentMethodInput = useRef();
  const costInput = useRef();
  const dateInput = useRef();
  const timeInput = useRef();
  const descriptionInput = useRef();
  const tagInput = useRef();
  const ImageURLInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = parseData();

    if (editIdStatus) {
      updateTransactionHandler({ transaction: data });
      return;
    }
    insertTransaction({ transaction: data });
  };

  const parseData = () => {
    const ISODate = new Date(
      `${dateInput.current.value} ${timeInput.current.value}`
    );
    return {
      category: categoryInput.current.value,
      paymentMethod: paymentMethodInput.current.value,
      cost: costInput.current.value,
      date: ISODate,
      description: descriptionInput.current.value,
      tag: [tagInput.current.value],
      imageURL: ImageURLInput.current.value,
    };
  };

  const insertData = (transaction) => {
    categoryInput.current.value = transaction.category || '';
    paymentMethodInput.current.value = transaction.paymentMethod || '';
    costInput.current.value = transaction.cost || '';
    dateInput.current.value =
      `${transaction.year}-${transaction.month}-${transaction.day}` || '';
    timeInput.current.value = transaction.time || '';
    descriptionInput.current.value = transaction.description || '';
    tagInput.current.value = transaction?.tag || '';
    ImageURLInput.current.value = transaction.imageURL || '';
  };

  useLayoutEffect(() => {
    insertData(editIdStatus);
  }, []);

  return (
    <>
      <div>Transaction Input Form</div>
      <StyledForm onSubmit={handleSubmit}>
        <label>
          category:
          <input type="text" name="name" ref={categoryInput} />
        </label>
        <label>paymentMethod:</label>
        <select ref={paymentMethodInput}>
          {paymentMethods.map((paymentMethod, i) => {
            return (
              <Fragment key={`paymentMethod-${i}`}>
                <option value={paymentMethod}>{paymentMethod}</option>
              </Fragment>
            );
          })}
        </select>
        <label>
          cost:
          <input type="text" name="name" ref={costInput} />
        </label>
        <label>
          date:
          <input type="date" name="name" ref={dateInput} />
        </label>
        <label>
          time:
          <input type="time" step="any" name="name" ref={timeInput} />
        </label>
        <label>
          description:
          <input type="text" name="name" ref={descriptionInput} />
        </label>
        <label>tag:</label>
        <select ref={tagInput}>
          {tags.map((tag, i) => {
            return (
              <Fragment key={`tag-${i}`}>
                <option value={tag}>{tag}</option>
              </Fragment>
            );
          })}
        </select>
        <label>
          imageURL:
          <input type="text" name="name" ref={ImageURLInput} />
        </label>
        <button type="submit" value="Submit">
          확인
        </button>
      </StyledForm>
      {editIdStatus && <button onClick={handleCancel}>수정 취소</button>}
    </>
  );
};

export default TransactionInputForm;
