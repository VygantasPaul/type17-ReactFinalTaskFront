import React from "react";
import Spinner from "../Spinner/Spinner";
type ButtonType = {
  onClick: () => void;
  isLoading: Boolean;
  text: string;
  className: string;
};
const Button: React.FC<ButtonType> = ({
  onClick,
  isLoading,
  text,
  className,
}) => {
  return (
    <div>
      {!isLoading ? (
        <button
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          className={className}
        >
          {text}
        </button>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Button;
