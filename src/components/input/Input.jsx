import React from "react";

const Input = ({ name, value, onChange, placeholder, type = "text", required = false }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full mb-2 p-2 border rounded"
      required={required}
    />
  );
};

export default Input;
