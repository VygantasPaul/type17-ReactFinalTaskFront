import React from "react";
type InputType = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  name: string;
  className: string;
  id: string;
  label: string;
  labelClassName: string;
  type: string;
};
const Input: React.FC<InputType> = ({
  value,
  setValue,
  placeholder,
  name,
  className,
  id,
  label,
  labelClassName,
  type,
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="my-2">
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          name={name}
          className={className}
          placeholder={placeholder}
        ></input>
      </div>
    </div>
  );
};

export default Input;
