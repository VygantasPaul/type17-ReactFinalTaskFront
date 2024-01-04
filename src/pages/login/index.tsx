/* eslint-disable @next/next/no-img-element */
import AddTemplate from "@/components/PageTemplate/AddTemplate";
import React, { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import LoginForm from "@/components/Users/LoginForm/LoginForm";
// eslint-disable-next-line react-hooks/rules-of-hooks
type AlertType = {
  message: string;
  type: "success" | "error";
};
const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<AlertType | null>(null);
  const onLogin = async () => {
    const checkLogin = () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !password) {
        setAlertState({
          message: "Please fill in all required fields",
          type: "error",
        });

        return false;
      } else if (!emailRegex.test(email)) {
        setAlertState({ message: "Wrong email format", type: "error" });

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
          `${process.env.DEFAULT_PATH}/users/login`,
          body
        );
        cookie.set("jwttoken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data));
        setLoading(false);
        if (response.status === 200) {
          setTimeout(() => {
            router.push("/");
          }, 1000);

          setAlertState({
            message: "User logged in. Redirecting....",
            type: "success",
          });
        }
      }
    } catch (err) {
      // @ts-ignore
      if (err.response.status === 401 || err.response.status === 400) {
        setAlertState({
          message: "Bad user email or password",
          type: "error",
        });
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
            alertState={alertState}
          />
        </div>
      </div>
    </AddTemplate>
  );
};

export default Login;
