import React from 'react';

const Button = ({
  label = '',
  className = '',
  onClick,
  type = 'button',
  icon = null,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`capitalize transition-all ease-in-out duration-300 px-5 py-2 border-2 border-black ${className}`}
      onClick={onClick}
      {...props}
    >
      {label} {icon}
    </button>
  );
};

export default Button;
