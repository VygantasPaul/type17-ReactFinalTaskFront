import React from "react";
type AlertType = {
  alert: string | null;
  type?: "success" | "error";
};
const Alerts: React.FC<AlertType> = ({ alert, type }) => {
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
    <>
      {alert && (
        <div className={`mt-2 p-2 border-2 ${borderClass} ${alertClass}`}>
          {alert}
        </div>
      )}
    </>
  );
};

export default Alerts;
