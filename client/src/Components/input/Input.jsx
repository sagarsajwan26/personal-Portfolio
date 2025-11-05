import React from 'react';

const Input = ({
  type = 'text', 
  label,
  placeholder,
  className = '',
  id,
  value,
  onChange,
  ...props
}) => {
  const inputId = id || undefined;

  return (
 <>
  {label && <label htmlFor={inputId} className="block mb-1 font-medium">{label}</label>}
  <input
    id={inputId}
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder || ''}
    className={`capitalize transition-all ease-in-out duration-300 px-5 py-2  ${className}`}
    {...props}
  />
</>

  );
};

export default Input;
