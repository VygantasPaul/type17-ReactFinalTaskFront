/* eslint-disable @next/next/no-img-element */
import AddTemplate from "@/components/PageTemplate/AddTemplate";
import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Alerts from "@/components/Alerts/Alerts";
import { useRouter } from "next/router";
import LoginForm from "@/components/Users/LoginForm/LoginForm";

const Login = () => {
  const router = useRouter();
  const [alert, setAlert] = useState<string | null>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const onLogin = async () => {
    const checkLogin = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !password) {
        setAlert("Please fill in all required fields");
        return false;
      } else if (!emailRegex.test(email)) {
        setAlert("Wrong email format");
        return false;
      } else {
        return true;
      }
    };
    try {
      const isValid = checkLogin();
      if (isValid) {
        const body = {
          email: email,
          password: password,
        };
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3010/users/login",
          body
        );
        cookie.set("jwttoken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        setLoading(false);
        if (response.status === 200) {
          setTimeout(() => {
            router.push("/");
          }, 1000);

          setAlert("User logged in");
        }
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401 || err.response.status === 400) {
        setAlert("Bad user email or  password");
        setLoading(false);
        return false;
      }
    }
  };
  return (
    <AddTemplate>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <h2 className="mt-5 lg:mt-10 text-center font-bold text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign form
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            onLogin={onLogin}
            alert={alert}
          />
        </div>
      </div>
    </AddTemplate>
  );
};

export default Login;
