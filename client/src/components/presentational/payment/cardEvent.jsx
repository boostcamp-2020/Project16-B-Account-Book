import Swal from 'sweetalert2';

import { confirmFormat } from '@service/swalFormat';

export const deleteCard = ({ cardDelete, selectedCardName }) => {
  Swal.fire(
    confirmFormat({
      position: 'top',
    })
  ).then((result) => {
    if (result.isConfirmed) {
      cardDelete({
        paymentName: selectedCardName,
      });
    }
  });
};

export const updateCard = ({ cardUpdate, selectedCardName }) => {
  Swal.fire({
    text: `수정할 카드 명을 입력해주세요`,
    input: 'text',
    inputPlaceholder: selectedCardName,
    inputAttributes: {
      autocapitalize: 'off',
    },
    showCancelButton: true,
    confirmButtonText: '수정',
    cancelButtonText: '취소',
    showLoaderOnConfirm: true,
    preConfirm: (newCardName) => {
      cardUpdate({
        selectedCardName,
        newCardName,
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `카드 수정이 완료되었습니다.`,
      });
    }
  });
};
