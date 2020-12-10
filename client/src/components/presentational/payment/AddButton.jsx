import React, { useState } from 'react';
import styled from 'styled-components';
import * as FcIcons from 'react-icons/fc';

import PaymentModal from './PaymentModal';

const AddPaymentBtn = styled.div`
  width: 93%;
  display: flex;
  flex-direction: row-reverse;
  cursor: pointer;
  border: none;
  outline: none;
  font-family: 'Noto Sans KR', sans-serif;
`;

const AddButton = ({ payments, addClick }) => {
  const AddCard = async (cardName) => {
    addClick({ paymentName: cardName });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <AddPaymentBtn onClick={handleShow}>
        <FcIcons.FcPlus
          size={40}
          style={{
            filter: `drop-shadow(4px 2px 2px rgba(0, 0, 0, 0.173))`,
          }}
        />
      </AddPaymentBtn>
      <PaymentModal
        isOpen={show}
        close={handleClose}
        AddCard={AddCard}
        payments={payments}
      />
    </>
  );
};

export default AddButton;
