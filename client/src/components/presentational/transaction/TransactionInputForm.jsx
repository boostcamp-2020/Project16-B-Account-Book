import { Fragment, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import categories from '@presentational/category_tag/categories';
import currencyExchange from '@util/currencyExchange';
import { useSelector } from 'react-redux';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  & > * {
    margin-bottom: 10px;
  }
`;

const Select = styled.select`
  position: relative;
  padding: 8px 0px 8px 15px;
  background: #fff;
  border: 1px solid #ddd;
  line-height: 34px;
  font-size: 15px;
  text-align: left;
`;

const Input = styled.input`
  position: relative;
  padding: 0 0 0 15px;
  background: #fff;
  border: 1px solid #ddd;
  line-height: 34px;
  font-size: 15px;
  text-align: left;
`;

const Button = styled.button`
  display: inline-block;
  padding: 0 16px;
  min-width: 88px;
  background: #ffc0cb;
  border: 0;
  border-radius: 2px;
  text-align: center;
  font-size: 14px;
  line-height: 34px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.258824) 0 2px 2px 0;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  background: #fafafa;
  color: #111;
  &:hover {
    background: #ffc0cb;
    color: #fff;
  }
`;

const TransactionInputForm = ({
  insertTransaction,
  updateTransactionHandler,
  deleteTransactionHandler,
  handleClose,
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
  const currencyInput = useRef();

  const paymentMethods =
    useSelector((state) => state.default.paymentMethods) || [];
  const tags = useSelector((state) => state.tag.tags) || [];
  const editIdStatus = useSelector((state) => state.transaction.editIdStatus);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = parseData();

    if (editIdStatus) {
      updateTransactionHandler({
        transactionId: editIdStatus,
        transaction: data,
      });
      handleClose();
      return;
    }

    insertTransaction({ transaction: data });
    handleClose();
  };

  const handleDelete = () => {
    deleteTransactionHandler([editIdStatus._id]);
    handleClose();
  };

  const parseData = () => {
    const ISODate = new Date(
      `${dateInput.current.value} ${timeInput.current.value}`
    );
    return {
      category: categoryInput.current.value,
      paymentMethod: paymentMethodInput.current.value,
      cost: changeCurrency(
        costInput.current.value,
        currencyInput.current.value
      ),
      type: typeInput.current.value,
      date: ISODate,
      description: descriptionInput.current.value,
      tag: [tagInput.current.value],
      imageURL: ImageURLInput.current.value,
    };
  };

  const insertData = (transaction = {}) => {
    categoryInput.current.value = transaction?.category || '';
    paymentMethodInput.current.value = transaction?.paymentMethod || '';
    costInput.current.value = transaction?.cost || 0;
    typeInput.current.value = transaction?.type || '지출';
    dateInput.current.value = getDate(transaction);
    timeInput.current.value = getTime(transaction);
    descriptionInput.current.value = transaction?.description || '';
    tagInput.current.value = [transaction?.tag] || [];
    ImageURLInput.current.value = transaction?.imageURL || '';
  };

  const changeCurrency = (cost, currency) => {
    if (currency === '원') {
      return cost.replace(/[^\d]/g, '');
    }
    return currencyExchange(cost, currency);
  };

  const getDate = (transaction = {}) => {
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
      <StyledForm onSubmit={handleSubmit}>
        <label>
          수입/지출: &nbsp;
          <Select ref={typeInput}>
            <option value={'지출'}>지출</option>
            <option value={'수입'}>수입</option>
          </Select>
        </label>
        <label>
          구분: &nbsp;
          <Input type="text" list="category" ref={categoryInput} />
          <datalist id="category">
            {categories.map((category, i) => {
              return (
                <Fragment key={`category-${i}`}>
                  <option value={category.title}>{category.title}</option>
                </Fragment>
              );
            })}
          </datalist>
        </label>
        <label>
          수단: &nbsp;
          <Input type="text" list="paymentMethod" ref={paymentMethodInput} />
          <datalist id="paymentMethod">
            {paymentMethods.map((paymentMethod, i) => {
              return (
                <Fragment key={`paymentMethod-${i}`}>
                  <option value={paymentMethod}>{paymentMethod}</option>
                </Fragment>
              );
            })}
          </datalist>
        </label>
        <label>
          가격: &nbsp;
          <Input type="number" name="name" ref={costInput} />
          <Select ref={currencyInput}>
            <option value={'원'}>원</option>
            <option value={'USD'}>USD</option>
            <option value={'EUR'}>EUR</option>
            <option value={'RUB'}>RUB</option>
            <option value={'CNY'}>CNY</option>
            <option value={'JPY'}>JPY</option>
          </Select>
        </label>

        <label>
          날짜: &nbsp;
          <Input type="date" name="name" ref={dateInput} />
        </label>
        <label>
          시간: &nbsp;
          <Input type="time" step="any" name="name" ref={timeInput} />
        </label>
        <label>
          설명: &nbsp;
          <Input type="text" name="name" ref={descriptionInput} />
        </label>
        <label>
          태그: &nbsp;
          <Input type="text" list="tag" ref={tagInput} />
          <datalist id="tag">
            {tags.map((tag, i) => {
              return (
                <Fragment key={`tag-${i}`}>
                  <option value={tag}>{tag}</option>
                </Fragment>
              );
            })}
          </datalist>
        </label>
        <label>
          <input type="text" name="name" ref={ImageURLInput} hidden />
        </label>
        <Button type="submit" value="Submit">
          확인
        </Button>
      </StyledForm>

      {editIdStatus && (
        <>
          <button onClick={handleClose}>수정 취소</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
    </>
  );
};

export default TransactionInputForm;
