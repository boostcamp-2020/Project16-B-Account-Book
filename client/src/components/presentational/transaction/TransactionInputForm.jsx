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
  const typeInput = useRef();

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
      type: typeInput.current.value,
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
    typeInput.current.value = transaction.type || '지출';
    dateInput.current.value = getDate(transaction);
    timeInput.current.value = getTime(transaction);
    descriptionInput.current.value = transaction.description || '';
    tagInput.current.value = transaction?.tag || '';
    ImageURLInput.current.value = transaction.imageURL || '';
  };

  const getDate = (transaction) => {
    if (transaction.date) {
      return `${transaction.year}-${transaction.month}-${transaction.day}`;
    }
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const getTime = (transaction) => {
    if (transaction.date) {
      return transaction.time;
    }
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${hour}:${minute}:${second}`;
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
        <label>
          paymentMethod:
          <select ref={paymentMethodInput}>
            {paymentMethods.map((paymentMethod, i) => {
              return (
                <Fragment key={`paymentMethod-${i}`}>
                  <option value={paymentMethod}>{paymentMethod}</option>
                </Fragment>
              );
            })}
          </select>
        </label>
        <label>
          cost:
          <input type="text" name="name" ref={costInput} />
        </label>
        <label>
          수입/지출:
          <select ref={typeInput}>
            <option value={'지출'}>지출</option>
            <option value={'수입'}>수입</option>
          </select>
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
        <label>
          tag:
          <select ref={tagInput}>
            {tags.map((tag, i) => {
              return (
                <Fragment key={`tag-${i}`}>
                  <option value={tag}>{tag}</option>
                </Fragment>
              );
            })}
          </select>
        </label>
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
