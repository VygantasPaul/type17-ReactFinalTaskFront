import React, { useState } from "react";
import axios from "axios";
import AddTemplate from "@/components/PageTemplate/AddTemplate";
import { useRouter } from "next/router";

import RegisterForm from "@/components/Users/RegisterForm/RegisterForm";
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
          <RegisterForm
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setEmail}
            avatar={avatar}
            setAvatar={setAvatar}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onRegister={onRegister}
            alert={alert}
          />
        </div>
      </div>
    </AddTemplate>
  );
};

export default Register;
