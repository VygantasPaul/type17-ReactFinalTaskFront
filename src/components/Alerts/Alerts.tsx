// Alerts.tsx
import React from "react";

type AlertType = {
  message: string;
  type?: "success" | "error";
};

const Alerts: React.FC<AlertType> = ({ message, type }) => {
  let alertClass = "";
  let borderClass = "";

  if (type === "success") {
    alertClass = "text-green-500";
    borderClass = "border-green-300";
  } else if (type === "error") {
    alertClass = "text-red-500";
    borderClass = "border-red-300";
  }

  return (
    <div className={`mt-2 p-2 border-2 ${borderClass} ${alertClass}`}>
      {message}
    </div>
  );
};

export default Alerts;
