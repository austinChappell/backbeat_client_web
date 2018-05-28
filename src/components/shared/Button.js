import React from 'react';

const Button = (props) => {
  const {
    disabled,
    loading,
    onClick,
    title,
  } = props;

  return (
    <button
      className={disabled || loading ? 'Button disabled' : 'Button'}
      onClick={onClick}
    >
      {loading ? 'Loading' : title}
    </button>
  );
};

export default Button;
