import React from "react";
type AlertType = {
  alert: string | null;
};
const Alerts: React.FC<AlertType> = ({ alert }) => {
  return (
    <>
      {alert && (
        <div className="text-red-500 mt-2 p-2 border-2 border-red-300">
          {alert}
        </div>
      )}
    </>
  );
};

export default Alerts;
