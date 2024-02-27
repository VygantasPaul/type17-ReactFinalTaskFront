import React, { useState } from "react";
import axios from "axios";
import AddTemplate from "@/components/PageTemplate/AddTemplate";
import { useRouter } from "next/router";
import RegisterForm from "@/components/Users/RegisterForm/RegisterForm";
const Register = () => {
  type AlertType = {
    message: string;
    type: "success" | "error";
  };
  const [email, setEmail] = useState<string | null>("");
  const [name, setName] = useState<string | null>("");
  const [avatar, setAvatar] = useState<string | null>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<AlertType | null>(null);
  const router = useRouter();
  const validation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const inputRegex = /^\S.{4,}/;
    const imageUrlRegex =
      /^(https?:\/\/)?(?:www\.)?([^.\s]+\.[^.\s]+)(\.\w{2,})+\/([^.\s]+\.\w{3,})$/;

    if (!email || !name || !password) {
      setAlertState({
        message: "Please fill in all required fields",
        type: "error",
      });
      return false;
    } else if (!emailRegex.test(email)) {
      setAlertState({ message: "Wrong email format", type: "error" });
      return false;
    } else if (!inputRegex.test(name)) {
      setAlertState({
        message: "Please enter name atleat 4 letters",
        type: "error",
      });
      return false;
    } else if (!avatar) {
      setAlertState({ message: "Empty avatar field", type: "error" });
      return false;
    } else if (!imageUrlRegex.test(avatar)) {
      setAlertState({ message: "Wrong image path", type: "error" });
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
          `${process.env.DEFAULT_PATH}/users/register`,
          body
        );
        setLoading(false);
        if (response.status === 200) {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
          setAlertState({
            message: "User registered. Redirecting...",
            type: "error",
          });
        }
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 500) {
        setAlertState({
          message: "Something wrong please try enter different email",
          type: "error",
        });
        setLoading(false);
        return false;
      }
      // @ts-ignore
      if (err.response.status === 401) {
        setAlertState({
          message: "Bad user email or  password",
          type: "error",
        });
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
            setName={setName}
            avatar={avatar}
            setAvatar={setAvatar}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onRegister={onRegister}
            alertState={alertState}
          />
        </div>
      </div>
    </AddTemplate>
  );
};

export default Register;
