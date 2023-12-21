import React, { useState } from "react";
import axios from "axios";
import AddTemplate from "@/components/PageTemplate/AddTemplate";
import { useRouter } from "next/router";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";
const Register = () => {
  const [alert, setAlert] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [avatar, setAvatar] = useState<string | null>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const validation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputRegex = /^\S.{5,}/;
    const imageUrlRegex =
      /^(https?:\/\/)?(?:www\.)?([^.\s]+\.[^.\s]+)(\.\w{2,})+\/([^.\s]+\.\w{3,})$/;

    if (!email || !name || !password) {
      setAlert("Please fill in all required fields");
      return false;
    } else if (!emailRegex.test(email)) {
      setAlert("Wrong email format");
      return false;
    } else if (!inputRegex.test(name)) {
      setAlert("Please enter atleat 5 letters");
      return false;
    } else if (!avatar) {
      setAlert("Empty avatar field");
      return false;
    } else if (!imageUrlRegex.test(avatar)) {
      setAlert("Wrong image path");
      return false;
    } else {
      setAlert("Comment added successfully");
      return true;
    }
  };

  const onRegister = async () => {
    try {
      const isValid = validation();

      if (isValid) {
        const body = {
          name: name,
          avatar: avatar,
          email: email,
          password: password,
        };
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3010/users/register",
          body
        );
        setLoading(false);
        if (response.status === 200) {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          setAlert("User registered");
        }
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 500) {
        setAlert("Something wrong please try enter different email");
        setLoading(false);
        return false;
      }
      // @ts-ignore
      if (err.response.status === 401) {
        setAlert("Bad user email or  password");
        return false;
      }
    }
  };
  return (
    <AddTemplate>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 className="mt-10 text-center font-bold text-2xl leading-9 tracking-tight text-gray-900">
            Register form
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
              value={password}
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
        </div>
      </div>
    </AddTemplate>
  );
};

export default Register;
