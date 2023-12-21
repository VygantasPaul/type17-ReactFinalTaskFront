import React, { Dispatch } from "react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";
type RegisterType = {
  email: string | null;
  setEmail: () => void;
  name: string | null;
  setName: () => void;
  avatar: string | null;
  setAvatar: () => void;
  password: string | null;
  setPassword: () => void;
  isLoading: Boolean;
  onRegister: () => void;
  alert: string | null;
};
const RegisterForm: React.FC<RegisterType> = ({
  email,
  setEmail,
  name,
  setName,
  avatar,
  setAvatar,
  password,
  setPassword,
  isLoading,
  onRegister,
  alert,
}) => {
  return (
    <>
      <form className="space-y-6">
        <Input
          label="Email"
          labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
          value={String(email)}
          setValue={setEmail}
          className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder="Please fill email"
          name="email"
          type="text"
          id="email"
        />

        <Input
          label="Name"
          labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
          value={String(name)}
          setValue={setName}
          className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder="Please fill name"
          name="name"
          type="text"
          id="name"
        />
        <Input
          label="Avatar"
          labelClassName={`block text-sm font-medium leading-6 text-gray-900`}
          value={String(avatar)}
          setValue={setAvatar}
          className={`block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          placeholder="Please fill avatar url link"
          name="avatar"
          type="text"
          id="avatar"
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
          text="Register"
          isLoading={isLoading}
          onClick={onRegister}
          className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </form>
      <Alerts alert={alert} />
    </>
  );
};

export default RegisterForm;
