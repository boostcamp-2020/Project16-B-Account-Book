import React from 'react';

const LoginForm = ({ onClick }) => {
  return (
    <>
      <div>LoginForm</div>
      <button
        onClick={() => {
          onClick({ test: Date.now() });
        }}
      >
        aa
      </button>
    </>
  );
};

export default LoginForm;
