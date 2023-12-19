import React, { useState } from "react";
import axios from "axios";
import cookie from "js-cookie";
import AddTemplate from "@/components/PageTemplate/AddTemplate";
import { useRouter } from "next/router";
const Register = () => {
  const [alert, setAlert] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [avatar, setAvatar] = useState<string | null>("");
  const [password, setPassword] = useState<string>("");
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
      setAlert("Empty avatar field. But you can continue and add later");
      return true;
    } else if (!imageUrlRegex.test(avatar)) {
      setAlert("Wrong image path");
      return false;
    } else {
      setAlert("Location added successfully");
      return true;
    }
    // if (!email) {
    //   setAlert("Empty email field");
    //   return false;
    // } else if (!emailRegex.test(email)) {
    //   setAlert("Wrong email format");
    //   return false;
    // } else if (!name) {
    //   setAlert("Empty name field");
    //   return false;
    // } else if (!avatar) {
    //   setAlert("Empty avatar field. But you can continue");
    //   return true;
    // } else if (!password) {
    //   setAlert("Empty password");
    //   return false;
    // } else {
    //   setAlert("You successfully registered");
    //   return true;
    // }
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

        const response = await axios.post(
          "http://localhost:3010/users/register",
          body
        );

        if (response.status === 200) {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          setAlert("User registered");
        }
      }
    } catch (err) {
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
            Register
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Avatar
              </label>
              <div className="mt-2">
                <input
                  id="avatar"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  name="avatar"
                  type="avatar"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></input>
              </div>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onRegister();
                }}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
          {alert && (
            <div className="text-red-500 mt-2 p-2 border-2 border-red-300">
              {alert}
            </div>
          )}
        </div>
      </div>
    </AddTemplate>
  );
};

export default Register;
