import React from 'react';

const Button = ({ Icon, title, onClick, disabled, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
    >
      {Icon && <span className="mr-2">{Icon}</span>}
      {title}
    </button>
  );
};

export default Button;
