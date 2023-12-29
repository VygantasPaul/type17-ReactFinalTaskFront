import React from "react";

type TextAreaType = {
  value: string;
  setValue: (value: string) => void;
  id: string;
  labelClassName: string;
  className: string;
  placeholder: string;
  label: string | null;
};

const Textarea: React.FC<TextAreaType> = ({
  value,
  setValue,
  label,
  id,
  labelClassName,
  className,
  placeholder,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          className={className}
          placeholder={placeholder}
        ></textarea>
      </div>
    </>
  );
};

export default Textarea;
