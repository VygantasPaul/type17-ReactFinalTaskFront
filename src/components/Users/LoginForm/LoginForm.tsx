import React, { Dispatch, SetStateAction } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";

type AlertType = {
  message: string;
  type: "success" | "error";
};

type LoginType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  onLogin: () => void;
  alertState: AlertType | null;
};

const LoginForm: React.FC<LoginType> = ({
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onLogin,
  alertState,
}) => {
  const convertAlert = (alertString: string | null): AlertType[] => {
    if (alertString) {
      return [{ message: alertString, type: "error" }];
    }
    return [];
  };

  convertAlert(alertState?.message || null);

  return (
    <>
      <form className="space-y-6">
        <Input
          label="Email"
          labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
          value={String(email)}
          setValue={setEmail}
          className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder="Please fill Email"
          name="email"
          type="text"
          id="email"
        />
        <Input
          label="Password"
          labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
          value={String(password)}
          setValue={setPassword}
          className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder="Please fill password"
          name="password"
          type="password"
          id="password"
        />

        <Button
          text="Login"
          isLoading={isLoading}
          onClick={onLogin}
          className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </form>
      {alertState && (
        <Alerts message={alertState.message} type={alertState.type} />
      )}
    </>
  );
};

export default LoginForm;
