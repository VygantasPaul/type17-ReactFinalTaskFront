import React from "react";

type TextAreaType = {
  value: string;
  setValue: (value: string) => void;
  id: string;
  labelClassName: string;
  placeholder: string;
  label?: string; // Change type to string and make it optional
};

const Textarea: React.FC<TextAreaType> = ({
  value,
  setValue,
  label,
  id,
  labelClassName,
  placeholder,
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  ">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          id={id}
          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  "
          placeholder={placeholder}
        ></textarea>
      </div>
    </>
  );
};

export default Textarea;
