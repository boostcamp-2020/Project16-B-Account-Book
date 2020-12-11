export const errorFormat = ({ position, title, text }) => {
  return {
    icon: 'error',
    position,
    title,
    text,
  };
};

export const successFormat = ({ position, title }) => {
  return {
    position,
    icon: 'success',
    title,
    showConfirmButton: false,
    timer: 700,
  };
};

export const confirmFormat = ({ position }) => {
  return {
    position,
    iconColor: '#ff5722',
    text: '정말 삭제하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff5722',
    cancelButtonColor: '#cfcfd0',
    confirmButtonText: '삭제',
    cancelButtonText: '취소',
  };
};
