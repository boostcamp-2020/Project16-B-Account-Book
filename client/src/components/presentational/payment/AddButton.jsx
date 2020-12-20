import React, { useState } from 'react';
import styled from 'styled-components';
import { FcPlus } from 'react-icons/fc';

import PaymentModal from './PaymentModal';

const AddPaymentBtn = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 93%;
  cursor: pointer;
  border: none;
  outline: none;
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
        <FcPlus
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
